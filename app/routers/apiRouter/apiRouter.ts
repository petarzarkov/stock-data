import {
    stocks, stocksSchema, getById, getByIdSchema,
    delByIdSchema, delById, bulkCreate, bulkCreateSchema,
    bulkDelete, bulkDeleteSchema, getCount, getCountSchema
} from "@app/handlers";
import { addRepoPlugin, addAuthPlugin } from "@app/server/plugins";
import { FastifyInstance, FastifyPluginOptions } from "fastify";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const apiRouter = (app: FastifyInstance, _options: FastifyPluginOptions, next: (err?: Error | undefined) => void) => {

    app.get("/stocks", { schema: stocksSchema }, stocks);

    app.register(addRepoPlugin);

    app.get("/stocks/:id", { schema: getByIdSchema("stock") }, getById);
    app.get("/stocks/count", { schema: getCountSchema("stock") }, getCount);

    next();
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const apiRouterAuth = (app: FastifyInstance, _options: FastifyPluginOptions, next: (err?: Error | undefined) => void) => {
    app.register(addRepoPlugin);
    app.register(addAuthPlugin);

    app.post("/stocks", { schema: bulkCreateSchema("stocks") }, bulkCreate);

    app.delete("/stocks/:id", { schema: delByIdSchema("stock") }, delById);

    app.delete("/stocks", { schema: bulkDeleteSchema("stock") }, bulkDelete);

    next();
};
