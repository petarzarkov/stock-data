import { CategoriesDTO, CategoriesRepo, LangRepo, LanguagesDTO, QuestionsDTO, QuestionsRepo } from "@db/repositories";
import { Expand, HotLogger, HotRequests } from "hot-utils";
import { decodeHtml, getRandomDifficulty } from "./utils";

const log = HotLogger.createLogger("stock-data/feeder");

export type AbstractQuestions = Expand<Omit<QuestionsDTO, "id" | "categoryId" | "languageId"> & { category: string }>;
export type IGetQuestions = { url: string; resultKey?: string };
export type IFeedOptions = { opts: IGetQuestions; interval?: number; numberOfFeeders?: number };

export class FeederFactory {
    private _intervalId: NodeJS.Timer | undefined;
    private opts: IGetQuestions;
    interval: number;
    numberOfFeeders: number;
    categoriesToAdd: Set<string>;
    questionsToAdd: AbstractQuestions[];
    latestCreated: QuestionsDTO[];
    defaultLanguage: LanguagesDTO;
    defaultCategory: CategoriesDTO;

    get isRunning() {
        return !!this._intervalId;
    }

    constructor({ opts, interval = 7000, numberOfFeeders = 3 }: IFeedOptions) {
        this.opts = opts;
        this.interval = interval;
        this.numberOfFeeders = numberOfFeeders;
        this.categoriesToAdd = new Set();
        this.questionsToAdd = [];
    }

    private create = async () => {
        this.categoriesToAdd.clear();
        this.questionsToAdd = [];
        const lang = await LangRepo.getLast();
        if (!lang.isSuccess || !lang.result) {
            return;
        }

        this.defaultLanguage = lang.result;

        const category = await CategoriesRepo.getLast();
        if (!category.isSuccess || !category.result) {
            return;
        }

        this.defaultCategory = category.result;

        const currCategories = await CategoriesRepo.getAll();
        if (!currCategories.isSuccess || !currCategories?.result?.length) {
            return;
        }
        const promises = [...Array(this.numberOfFeeders).keys()].map(this.getQuestions);

        await Promise.allSettled(promises);

        if (this.categoriesToAdd.size || this.questionsToAdd.length) {
            log.info(`Feeding from ${this.opts.url}`, { questionsLength: this.questionsToAdd.length, newCategories: this.categoriesToAdd.size });
            const latest = await this.processQuestions({
                currCategories: currCategories.result,
                categories: [...this.categoriesToAdd],
                questions: this.questionsToAdd
            });

            if (latest?.createdQuestions.isSuccess && latest.createdQuestions.result) {
                this.latestCreated = latest.createdQuestions.result;
            }
        }
    };

    private getQuestions = async () => {
        return HotRequests.get<Record<string, unknown>, Record<string, unknown>>({
            url: this.opts.url
        }).then(async r => {
            if (r.success && r.result) {
                const resultKey = this.opts.resultKey;
                const res = (resultKey && r.result?.[resultKey] && Array.isArray(r.result?.[resultKey]) && r.result[resultKey] || Array.isArray(r.result) && r.result) as Array<Record<string, string>>;
                if (!res) {
                    return;
                }
                const keys = Object.keys(res[0]);
                const questionKey = keys.find(key => key.includes("question")) as string;
                const correctAnswerKey = keys.find(key => key.includes("correct")) as string;
                const category = keys.find(key => key.includes("category")) as string;
                const incorrect = keys.find(key => key.includes("incorrect")) as string;
                const diff = keys.find(key => key.includes("diff")) as string;
                const questions: AbstractQuestions[] = res.map(question => {
                    this.categoriesToAdd.add(question[category]);
                    return {
                        question: decodeHtml(question[questionKey]),
                        correctAnswer: decodeHtml(question[correctAnswerKey]),
                        category: question[category],
                        difficulty: question[diff] || getRandomDifficulty(),
                        incorrectAnswers: (question[incorrect] as unknown as string[]).map(decodeHtml)
                    };
                });

                this.questionsToAdd = [...this.questionsToAdd, ...questions];
                if (this.latestCreated.length) {
                    this.questionsToAdd = this.questionsToAdd.filter(qa => this.latestCreated.some(lc => lc.question !== qa.question));
                }
            }
        });
    };

    private processQuestions = async ({ currCategories, categories, questions }: {
        currCategories: CategoriesDTO[];
        categories: string[];
        questions: AbstractQuestions[];
    }) => {

        const categoriesKeys = currCategories.map(cat => cat.category);
        const categoriesToAdd = categories.reduce((prev, curr) => {
            if (!categoriesKeys.includes(curr)) {
                prev.push(curr);
            }

            return prev;
        }, [] as string[]);

        let addedCategories: CategoriesDTO[] | null | undefined = [];
        if (categoriesToAdd.length) {
            const createdCats = await CategoriesRepo.createBulk({
                dtos: categoriesToAdd.map(ca => ({
                    category: ca,
                    previewName: ca,
                    languageId: this.defaultLanguage.id
                }))
            });

            if (!createdCats.isSuccess) {
                return;
            }
            addedCategories = createdCats.result;
        }

        const allCategories: CategoriesDTO[] = addedCategories?.length ? [...currCategories, ...addedCategories] : [...currCategories];
        const dtos = questions.reduce((prev, curr) => {
            if (prev.find(que => que.question === curr.question)) {
                return prev;
            }

            prev.push({
                ...curr,
                categoryId: allCategories.find(c => c.category === curr.category)?.id || this.defaultCategory.id,
                languageId: this.defaultLanguage.id,
            });

            return prev;
        }, [] as (Omit<QuestionsDTO, "id">)[]);
        const createdQuestions = await QuestionsRepo.createBulk({ dtos });

        return {
            allCategories,
            createdQuestions
        };
    };

    public start = () => {
        log.info(`Starting stock-data feeder for ${this.opts.url}`);
        this.create();
        this._intervalId = setInterval(this.create, this.interval);
        return this._intervalId;
    };

    public stop = () => {
        if (this._intervalId) {
            log.info(`Stopping stock-data feeder for ${this.opts.url}`);
            clearInterval(this._intervalId);
            this._intervalId = undefined;
        }
    };

}
