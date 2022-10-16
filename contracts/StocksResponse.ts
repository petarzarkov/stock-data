import type { StockAttributes } from "@db/models";
import type { BaseApiResponse } from "./BaseApiResponse";

export type Stock = StockAttributes;
export type StocksResponseData = {
    from: string;
    to: string;
    optimalFrom: string;
    optimalTo: string;
    affordableAmount: number;
    costPerUnit: number;
    profitPerUnit: number;
    totalCost: number;
    totalProfit: number;
    totalSalesInPeriod: number;
    salesInOptimalPeriod: Stock[];
};
export type StocksResponse = BaseApiResponse<StocksResponseData>;