export const isProd = process.env.NODE_ENV === "production";

/**
 * @default "dev"
 */
export const API_TOKEN = process.env.API_TOKEN || "dev";

export const APP_VERSION = process.env.npm_package_version || "unknown";

/**
 * @default 3000
 */
export const SERVER_PORT = Number(process.env.PORT) || 3001;

/**
 * @default 120000 ("2min")
 */
export const CACHE_REFRESH_INTERVAL = Number(process.env.CACHE_REFRESH_INTERVAL) || 2 * 60 * 1000;

