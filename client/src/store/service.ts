import { BaseApiResponse, BaseStocksData } from "../../../contracts/BaseApiResponse";

const serverUrl = import.meta.env.DEV ? "http://localhost:3001" : "";

export const baseServerCall = async <Response = Record<string, unknown>>(path: string) => {
    const raw = await fetch(`${serverUrl}${path}`, {
        headers: {
            apitoken: "dev"
        }
    });

    const res = await raw.json() as BaseApiResponse<Response>;
    return res;
};

export const getPeriodRanges = async () => baseServerCall<BaseStocksData>("/api/stocks/period");