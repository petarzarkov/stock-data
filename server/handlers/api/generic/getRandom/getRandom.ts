import { FastifyReply, FastifyRequest } from "fastify";
import { RouteGenericInterface } from "fastify/types/route";
import { Server, IncomingMessage, ServerResponse } from "http";
import { StockAttributes, StockTypesAttributes } from "@db/models";
import { fail } from "hot-utils";
import { literal } from "sequelize";

export const getRandom = async (
    req: FastifyRequest<{ Body: StockAttributes[] | StockTypesAttributes[] }, Server, IncomingMessage>,
    reply: FastifyReply<Server, IncomingMessage, ServerResponse, RouteGenericInterface, unknown>
) => {
    const random = await req.repo?.getAll({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        requestId: req.id,
        order: literal("random()"),
        limit: 50,
    });

    if (!random?.isOk) {
        reply.status(500);
        return fail("Oops, something happened.");
    }

    if (!random.result?.length) {
        reply.status(404);
        return fail("Sorry, nothing found.");
    }

    return random;
};