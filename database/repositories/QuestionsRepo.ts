import { TblCategories, TblLanguages, TblQuestions } from "@db/models";
import { BaseRepository } from "./BaseRepository";
import { ModelToDTO } from "@db/ModelToDTO";
import { Attributes, WhereOptions, literal } from "sequelize";
import { MIN_QUESTIONS } from "@app/constants";
import { Expand } from "hot-utils";

export type QuestionsDTO = ModelToDTO<TblQuestions>;
export type RandomQuestionsDTO = Expand<QuestionsDTO & { category?: string; lang?: string }>;

function mapTableToDTO(model: TblQuestions): QuestionsDTO {
  return {
    id: model.id,
    categoryId: model.categoryId,
    languageId: model.languageId,
    difficulty: model.difficulty,
    question: model.question,
    correctAnswer: model.correctAnswer,
    incorrectAnswers: model.incorrectAnswers,
  };
}

class QuestionsRepository extends BaseRepository<TblQuestions, QuestionsDTO> {
  constructor() {
    super({
      table: TblQuestions,
      mapTableToDTO,
    });
  }

  public getRandom = async ({ where, requestId, amount = MIN_QUESTIONS }: { amount?: number; where?: WhereOptions<QuestionsDTO>; requestId?: string } = {}) => {
    return this.commit<RandomQuestionsDTO[] | null>({
      requestId,
      command: () => this.table.findAll({
        where: where as unknown as WhereOptions<Attributes<TblQuestions>>,
        order: literal("random()"),
        limit: amount,
        include: [{ model: TblCategories, attributes: ["category"] }, { model: TblLanguages, attributes: ["lang"] }]
      }).then(e => e.length ? e?.map(r => ({
        ...this.mapTableToDTO(r),
        category: (r as unknown as { tblCategories?: { category?: string } })?.tblCategories?.category,
        lang: (r as unknown as { tblLanguages?: { lang?: string } })?.tblLanguages?.lang,
      })) : null)
    });
  };
}

export const QuestionsRepo = new QuestionsRepository();

