import {
    questions, questionsSchema, getById, getByIdSchema, categories, categoriesSchema,
    languages, languagesSchema, delByIdSchema, delById, bulkCreate, bulkCreateSchema,
    bulkDelete, bulkDeleteSchema, getCount, getCountSchema
} from "@app/handlers";
import { addRepoPlugin, addAuthPlugin } from "@app/server/plugins";
import { FastifyInstance, FastifyPluginOptions } from "fastify";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const apiRouter = (app: FastifyInstance, _options: FastifyPluginOptions, next: (err?: Error | undefined) => void) => {

    app.get("/questions", { schema: questionsSchema }, questions);
    app.get("/categories", { schema: categoriesSchema }, categories);
    app.get("/languages", { schema: languagesSchema }, languages);

    app.register(addRepoPlugin);

    app.get("/questions/:id", { schema: getByIdSchema("question") }, getById);
    app.get("/categories/:id", { schema: getByIdSchema("category") }, getById);
    app.get("/languages/:id", { schema: getByIdSchema("language") }, getById);

    app.get("/questions/count", { schema: getCountSchema("question") }, getCount);
    app.get("/categories/count", { schema: getCountSchema("category") }, getCount);
    app.get("/languages/count", { schema: getCountSchema("language") }, getCount);

    next();
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const apiRouterAuth = (app: FastifyInstance, _options: FastifyPluginOptions, next: (err?: Error | undefined) => void) => {
    app.register(addRepoPlugin);
    app.register(addAuthPlugin);

    app.post("/questions", { schema: bulkCreateSchema("question") }, bulkCreate);
    app.post("/languages", { schema: bulkCreateSchema("language") }, bulkCreate);
    app.post("/categories", { schema: bulkCreateSchema("category") }, bulkCreate);

    app.delete("/questions/:id", { schema: delByIdSchema("question") }, delById);
    app.delete("/categories/:id", { schema: delByIdSchema("category") }, delById);
    app.delete("/languages/:id", { schema: delByIdSchema("language") }, delById);

    app.delete("/questions", { schema: bulkDeleteSchema("question") }, bulkDelete);
    app.delete("/categories", { schema: bulkDeleteSchema("category") }, bulkDelete);
    app.delete("/languages", { schema: bulkDeleteSchema("language") }, bulkDelete);

    next();
};
