import { BaseApiResponse, BaseStocksData } from "./BaseApiResponse";

export type StocksResponseData = BaseStocksData & { profit: number };
export type StocksResponse = BaseApiResponse<StocksResponseData>;