/* eslint-disable @typescript-eslint/no-unused-vars */
import { FastifyReply, FastifyRequest } from "fastify";
import { QuestionsRepo } from "@db/repositories";
import { RouteGenericInterface } from "fastify/types/route";
import { Server, IncomingMessage, ServerResponse } from "http";
import { withError } from "@contracts/APIResults";

export const questions = async (
  req: FastifyRequest<{ Querystring: { amount?: number; languageId?: number; categoryId?: number } }, Server, IncomingMessage, unknown>,
  reply: FastifyReply<Server, IncomingMessage, ServerResponse, RouteGenericInterface, unknown>
) => {
  const { amount, languageId, categoryId } = req.query || {};

  const questions = await QuestionsRepo.getRandom({
    requestId: req.id,
    where: {
      ...languageId && { languageId },
      ...categoryId && { categoryId }
    },
    ...amount && { amount }
  });

  if (!questions.isSuccess) {
    reply.status(500);
    return withError("Oops, something happened.");
  }

  if (!questions.result) {
    reply.status(404);
    return withError("Sorry, nothing found for the given query.");
  }

  return questions;
};