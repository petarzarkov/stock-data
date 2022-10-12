import { QueryInterface } from "sequelize";

const baseTypes = [{ type: "SX5E:IND" }];

module.exports = {
    up: async (queryInterface: QueryInterface) => {
        await queryInterface.bulkInsert("tblStockTypes", baseTypes, {});
    },

    down: async (queryInterface: QueryInterface) => {
        await queryInterface.bulkDelete("tblStockTypes", {});
    }
};
