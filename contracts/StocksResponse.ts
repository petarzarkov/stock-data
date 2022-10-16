import type { BaseApiResponse } from "./BaseApiResponse";

export type Sale = {
    buyTime: number;
    buyPrice: number;
    sellTime: number;
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
    salesInOptimalPeriod: Sale[];
};
export type StocksResponse = BaseApiResponse<StocksResponseData>;