import type { BaseApiResponse } from "./BaseApiResponse";

export type Sale = {
    buyTime: string;
    buyPrice: number;
    sellTime: string;
    sellPrice: number;
};

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
    latestSalesInOptimalPeriod: Sale[];
};
export type StocksResponse = BaseApiResponse<StocksResponseData>;