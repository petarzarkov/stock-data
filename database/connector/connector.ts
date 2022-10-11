import * as pg from "pg";
import { HotLogger } from "hot-utils";
import { Options } from "sequelize";
import { Model, ModelCtor, SequelizeOptions, Sequelize } from "sequelize-typescript";
import { TblCategories, TblLanguages, TblQuestions } from "@db/models";
import { getOptions } from "@db/utils";

const log = HotLogger.createLogger("@stock-data/db");

export type DBModels = ModelCtor<Model<Record<string, unknown>, Record<string, unknown>>>[] | string[];

// Set PostGre configuration. More info: https://github.com/brianc/node-postgres/blob/master/lib/defaults.js
pg.defaults.parseInt8 = true; // Parse BIGINT as integer, not as a string
pg.types.setTypeParser(1700, parseFloat); // Parser for DECIMAL
pg.types.setTypeParser(1231, parseFloat); // NUMERIC_ARRAY: 1231

export const connect = async ({ options, onConnect, models }:
{ options?: Options; onConnect?: () => Promise<void>; models?: DBModels } = {}) => {
    const config = options || getOptions();
    try {
        const sequelizeInstance = await establishConnection({ config, models });
        if (onConnect) {
            await onConnect();
        }

        return sequelizeInstance;
    } catch (error) {
        log.error("Unable to connect DB, retrying", { err: <Error>error, config });
        setTimeout(() => connect({ options: config, onConnect, models }), 15000);
        return;
    }
};

let sequelize: Sequelize | undefined;
const establishConnection = async ({ config, models }: { config: SequelizeOptions; models?: DBModels }): Promise<Sequelize> => {
    // On retry clear old connection
    if (sequelize) {
        sequelize.close();
        sequelize = undefined;
    }

    const defaults: Partial<SequelizeOptions> = {
        dialect: "postgres",
        validateOnly: false,
        pool: { max: 50 },
        benchmark: true,
        logging: false,
        models: models || [TblLanguages, TblCategories, TblQuestions],
        logQueryParameters: true,
    };
    sequelize = new Sequelize({ ...defaults, ...config });
    await sequelize.authenticate();
    log.info(`Connection has been established successfully to ${<string>config.database}`,
        { data: { port: config.port } });

    return sequelize;
};