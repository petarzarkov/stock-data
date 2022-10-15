import type { BaseApiResponse } from "./BaseApiResponse";

export type StocksResponseData = {
    from: string;
    to: string;
    affordableAmount: number;
    costPerUnit: number;
    profitPerUnit: number;
    totalCost: number;
    totalProfit: number;
    totalSalesInPeriod: number;
    sales: {
        id: string;
        typeId: string;
        buyTime: number;
        buyPrice: number;
        sellTime: number;
        sellPrice: number;
    }[];
};
export type StocksResponse = BaseApiResponse<StocksResponseData>;