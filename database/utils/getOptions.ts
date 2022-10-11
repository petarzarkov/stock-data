/* eslint-disable no-unsafe-optional-chaining */
import { isProd } from "@app/constants";
import { Options, Dialect } from "sequelize";

export const getOptions = (): Options => {
    const baseConfig: Options = {
        username: process.env.DB_USER || "postgres",
        password: process.env.DB_PASS || "postgres",
        database: process.env.DB_NAME || "stock-data",
        host: process.env.DB_HOST || "localhost",
        port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5445,
        dialect: process.env.DB_DIALECT as Dialect || "postgres",
    };

    // parse DATABASE_URL as it changes dynamically sometimes
    const dbUrl = process.env.DATABASE_URL ? process.env.DATABASE_URL.split(":") : [];
    if (dbUrl.length >= 4) {
        const [password, host] = dbUrl?.[2]?.split("@");
        const [port, database] = dbUrl?.[3]?.split("/");
        baseConfig.database = database;
        baseConfig.password = password;
        baseConfig.username = dbUrl?.[1].replace(/\/\//g, "");
        baseConfig.host = host;
        baseConfig.port = Number(port);
        baseConfig.dialect = dbUrl?.[0] as Dialect;
    }

    return {
        ...baseConfig,
        ...isProd && {
            ssl: true,
            dialectOptions: {
                ssl: {
                    require: true,
                    rejectUnauthorized: false
                }
            }
        }
    };
};