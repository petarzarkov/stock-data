import { StockTypesAttributes, StockCreationAttributes } from "@db/models";
import SequelizeType, { QueryInterface } from "sequelize";

const baseStocks: (Omit<StockCreationAttributes, "typeId">)[] = [{
    buyPrice: 1,
    buyTime: new Date(Date.now() - 10000),
    sellPrice: 2,
    sellTime: new Date(),
    updatedAt: new Date(),
    createdAt: new Date(),
}];

module.exports = {
    up: async (queryInterface: QueryInterface, Sequelize: typeof SequelizeType) => {
        return queryInterface.sequelize.transaction(async transaction => {
            const stockTypes = await queryInterface.sequelize.query<StockTypesAttributes>("SELECT * from \"tblStocks\"", { type: Sequelize.QueryTypes.SELECT, transaction });
            const stocks = baseStocks.map(q => ({
                ...q,
                typeId: stockTypes?.[0]?.id,
            }));
            await queryInterface.bulkInsert("tblStocks", stocks, { transaction });
        });

    },

    down: async (queryInterface: QueryInterface, Sequelize: typeof SequelizeType) => {
        await queryInterface.bulkDelete("tblStocks", { createdAt: { [Sequelize.Op.in]: baseStocks.map(r => r.createdAt) } });
    }
};
