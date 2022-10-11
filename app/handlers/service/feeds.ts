import { FeedsMgr } from "@app/feeder";
import { FastifyReply, FastifyRequest } from "fastify";
import { RouteGenericInterface } from "fastify/types/route";
import { Server, IncomingMessage, ServerResponse } from "http";

export const feeds = async (
  req: FastifyRequest<{ Body: { action: "start" | "stop" } }>,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _reply: FastifyReply<Server, IncomingMessage, ServerResponse, RouteGenericInterface, unknown>
) => {
  if (req.body.action === "stop") {
    FeedsMgr.stopAll();

    return {
      running: false
    };
  }

  if (!FeedsMgr.areRunning) {
    FeedsMgr.startAll();
  }

  return {
    running: true
  };
};