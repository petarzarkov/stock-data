import SequelizeType, { QueryInterface } from "sequelize";

const baseTypes = [{ type: "SX5E:IND" }, { type: "LUCID:LINK" }, { type: "PTR:ZRKOV" }];

module.exports = {
    up: async (queryInterface: QueryInterface) => {
        await queryInterface.bulkInsert("tblStockTypes", baseTypes, {});
    },

    down: async (queryInterface: QueryInterface, Sequelize: typeof SequelizeType) => {
        await queryInterface.bulkDelete("tblStockTypes", { type: { [Sequelize.Op.in]: baseTypes.map(r => r.type) } });
    }
};
