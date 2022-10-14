import { STOCKS_FROM, STOCKS_TO } from "@app/constants";
import {
    stocks, stocksSchema, getById, getByIdSchema,
    delByIdSchema, delById, bulkCreate, bulkCreateSchema,
    bulkDelete, bulkDeleteSchema, getCount, getCountSchema, stockTypesSchema, stockTypes
} from "@app/handlers";
import { addRepoPlugin, addAuthPlugin } from "@app/server/plugins";
import { generalErrors } from "@app/server/swagger/generalErrors";
import { FastifyInstance, FastifyPluginOptions } from "fastify";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const apiRouter = (app: FastifyInstance, _options: FastifyPluginOptions, next: (err?: Error | undefined) => void) => {
    app.register(addRepoPlugin);

    app.get("/stocks/period", {
        schema: {
            description: "Get stored data period (from-to)",
            tags: ["stocks"],
            response: {
                "2xx": {
                    description: "Successful response",
                    required: ["from", "to"],
                    type: "object",
                    properties: {
                        isOk: { type: "boolean" },
                        from: { type: "number", minimum: STOCKS_FROM },
                        to: { type: "number", maximum: STOCKS_TO },
                    },
                }
            },
            ...generalErrors
        },
        handler: () => {
            return {
                isOk: true,
                from: STOCKS_FROM,
                to: STOCKS_TO
            };
        }
    });
    app.get("/stocks", { schema: stocksSchema }, stocks);
    app.get("/stock/types", { schema: stockTypesSchema }, stockTypes);

    app.get("/stock/:id", { schema: getByIdSchema("stock") }, getById);
    app.get("/stock/types/:id", { schema: getByIdSchema("stock/types") }, getById);
    app.get("/stocks/count", { schema: getCountSchema("stocks") }, getCount);

    next();
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const apiRouterAuth = (app: FastifyInstance, _options: FastifyPluginOptions, next: (err?: Error | undefined) => void) => {
    app.register(addRepoPlugin);
    app.register(addAuthPlugin);

    app.delete("/stock/:id", { schema: delByIdSchema("stock") }, delById);
    app.delete("/stock/types/:id", { schema: delByIdSchema("stock/types") }, delById);

    app.post("/stocks", { schema: bulkCreateSchema("stock", "stocks") }, bulkCreate);
    app.post("/stocks/types", { schema: bulkCreateSchema("stock/types") }, bulkCreate);

    app.delete("/stocks", { schema: bulkDeleteSchema("stocks") }, bulkDelete);
    app.delete("/stocks/types", { schema: bulkDeleteSchema("stock/types") }, bulkDelete);

    next();
};
