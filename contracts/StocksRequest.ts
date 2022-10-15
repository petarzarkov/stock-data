import type { BaseStocksData } from "./BaseApiResponse";

export type StocksRequest = BaseStocksData & { balance: number };