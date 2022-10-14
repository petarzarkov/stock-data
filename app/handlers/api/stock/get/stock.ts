import { StockAttributes } from "@db/models";
import { FastifyReply, FastifyRequest } from "fastify";
import { RouteGenericInterface } from "fastify/types/route";
import { fail, IFailResult, IOkResult, ok } from "hot-utils";
import { Server, IncomingMessage, ServerResponse } from "http";
import { Op } from "sequelize";
import { StocksRepo } from "@db/repositories";

export type StocksRequest = { from: number; to: number };
export type StocksResponse = IFailResult | IOkResult<{ from: number; to: number; profit: number }>;

export const stocks = async (
    req: FastifyRequest<{ Querystring: StocksRequest }, Server, IncomingMessage>,
    reply: FastifyReply<Server, IncomingMessage, ServerResponse, RouteGenericInterface>
): Promise<StocksResponse> => {
    const { from, to } = req.query || {};

    const stocks = await (req.repo as typeof StocksRepo)?.getAll({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        requestId: req.id,
        where: {
            buyTime: { [Op.gt]: from },
            sellTime: { [Op.lt]: to },
        }
    });

    if (!stocks?.isOk) {
        reply.status(500);
        return fail("Oops, something happened.");
    }

    if (!stocks?.result) {
        reply.status(404);
        return fail("Sorry, nothing found for the given query.");
    }

    const highestProfitable = stocks.result.reduce((prev, curr) => {
        const profit = curr.sellPrice - curr.buyPrice;
        if (!prev.length) {
            return [{
                ...curr,
                profit
            }];
        }

        const prevO = prev?.[0];
        // If there is more than one best solution with equal profit, the service should
        // return the one that is earliest and shortest
        if (prevO?.profit <= profit) {
            return prevO.sellTime - prevO.buyTime < curr.sellTime - curr.buyTime ? prev : [{
                ...curr,
                profit
            }];
        }

        return prev;

    }, [] as (StockAttributes & { profit: number })[])[0];

    return ok({
        from: highestProfitable.buyTime,
        to: highestProfitable.sellTime,
        profit: highestProfitable.profit
    });
};