/* eslint-disable @typescript-eslint/no-unused-vars */
import { FastifyReply, FastifyRequest } from "fastify";
import { RouteGenericInterface } from "fastify/types/route";
import { Server, IncomingMessage, ServerResponse } from "http";

export const languages = async (
  req: FastifyRequest<RouteGenericInterface, Server, IncomingMessage, unknown>,
  _reply: FastifyReply<Server, IncomingMessage, ServerResponse, RouteGenericInterface, unknown>
) => {
  const languages = await req.caches?.languages.getCache({ requestId: req.id });
  return languages;
};