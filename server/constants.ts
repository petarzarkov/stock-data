export const isProd = process.env.NODE_ENV === "production";

/**
 * @default "dev"
 */
export const API_TOKEN = process.env.API_TOKEN || "dev";

export const APP_VERSION = process.env.npm_package_version || "unknown";

/**
 * @default 3001
 */
export const SERVER_PORT = Number(process.env.PORT) || 3001;

/**
 * @default "2022-02-01T06:00:00.000Z" in unix ms
 */
export const STOCKS_FROM = process.env.STOCKS_FROM ?
    new Date(...process.env.STOCKS_FROM?.split(",")?.map(t => Number(t.trim())) as [number] || 2022,1,1,6).getTime()
    : new Date(2022,1,1,6).getTime();

/**
 * @default "2022-02-01T08:00:00.000Z" in unix ms
 */
export const STOCKS_TO = process.env.STOCKS_TO ?
    new Date(...process.env.STOCKS_TO?.split(",")?.map(t => Number(t.trim())) as [number] || 2022,1,1,8,40).getTime()
    : new Date(2022,1,1,8,40).getTime();
