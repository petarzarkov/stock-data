import { getOptions } from "@db/utils";
import { Options } from "sequelize";

const env = process.env.NODE_ENV || "development";

const options: Options & Record<string, unknown> = {
  ...getOptions(),
  logging: true,
  migrationStorageTableName: "_migrations",
  seederStorage: "sequelize",
  seederStorageTableName: "_seeders"
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { password, ...rest } = options;
console.log("DB Options", JSON.stringify({ ...rest }));

module.exports = {
  [env]: options
};
