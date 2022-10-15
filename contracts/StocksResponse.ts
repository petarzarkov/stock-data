import type { StockAttributes } from "../database/models/tblStock";
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
    sales: StockAttributes[];
};
export type StocksResponse = BaseApiResponse<StocksResponseData>;