import type { IFailResult, IOkResult } from "hot-utils";

export type BaseApiResponse<T = Record<string, unknown>> = IFailResult | IOkResult<T>;
export type BaseStocksData = { from: number; to: number };