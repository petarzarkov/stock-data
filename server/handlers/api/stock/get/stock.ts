import { StockAttributes } from "@db/models";
import { FastifyReply, FastifyRequest } from "fastify";
import { RouteGenericInterface } from "fastify/types/route";
import { fail, ok } from "hot-utils";
import { Server, IncomingMessage, ServerResponse } from "http";
import { Op } from "sequelize";
import { StocksRepo } from "@db/repositories";
import { StocksRequest } from "@contracts/StocksRequest";
import { StocksResponse } from "@contracts/StocksResponse";

export const stocks = async (
    req: FastifyRequest<{ Querystring: StocksRequest }, Server, IncomingMessage>,
    reply: FastifyReply<Server, IncomingMessage, ServerResponse, RouteGenericInterface>
): Promise<StocksResponse> => {
    const { from, to, balance } = req.query || {};

    const stocks = await (req.repo as typeof StocksRepo)?.getAll({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        requestId: req.id,
        where: {
            buyTime: { [Op.gte]: from },
            sellTime: { [Op.lte]: to },
        }
    });

    if (!stocks?.isOk) {
        reply.status(500);
        return fail("Oops, something happened.");
    }

    if (!stocks?.result?.length) {
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
        if (prevO?.profit === profit) {
            return (prevO.sellTime - prevO.buyTime) < (curr.sellTime - curr.buyTime) ? prev : [{
                ...curr,
                profit
            }];
        }

        if (prevO?.profit < profit) {
            return [{
                ...curr,
                profit
            }];
        }

        return prev;

    }, [] as (StockAttributes & { profit: number })[])[0];

    const amountUserCouldveBought = balance / highestProfitable.buyPrice;
    return ok({
        from: new Date(highestProfitable.buyTime).toUTCString(),
        to: new Date(highestProfitable.sellTime).toUTCString(),
        affordableAmount: amountUserCouldveBought,
        costPerUnit: highestProfitable.buyPrice,
        profitPerUnit: highestProfitable.sellPrice,
        totalCost: amountUserCouldveBought * highestProfitable.buyPrice,
        totalProfit: amountUserCouldveBought * highestProfitable.profit,
        totalSalesInPeriod: stocks.result.length,
        sales: stocks.result
    });
};