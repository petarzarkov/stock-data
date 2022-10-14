import { QueryInterface } from "sequelize";

const baseTypes = [{ type: "SEKI:SAM" }, { type: "LUCID:LINK" }, { type: "PTR:ZRKOV" }];

module.exports = {
    up: async (queryInterface: QueryInterface) => {
        await queryInterface.bulkInsert("tblStockTypes", baseTypes, {});
    },

    down: async (queryInterface: QueryInterface) => {
        await queryInterface.dropTable("tblStockTypes", { force: true, cascade: true });
    }
};
