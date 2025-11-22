import { BaseApiResponse, BaseStocksData } from "../../../contracts/BaseApiResponse";
import { StocksResponseData } from "../../../contracts/StocksResponse";
import { StocksRequest } from "../../../contracts/StocksRequest";

export const serverUrl = import.meta.env.DEV ? "http://localhost:3001" : window.location.origin;

export const baseServerCall = async <Response = Record<string, unknown>>(path: string, query?: Record<string, string | number>) => {
    const url = path ? new URL(path, serverUrl) : new URL(serverUrl);
    if (query) {
        Object.entries(query).forEach(q => {
            if (q[0] && q[1]) {
                url.searchParams.set(q[0], q[1].toString());
            }
        });
    }

    const raw = await fetch(url);

    const res = await raw.json() as BaseApiResponse<Response>;
    return res;
};

export const getPeriodRanges = async () => baseServerCall<BaseStocksData>("/api/stocks/period");

export const getOptimalStock = async (req: StocksRequest) => baseServerCall<StocksResponseData>("/api/stocks", req);