import { StockTypesAttributes, StockCreationAttributes } from "@db/models";
import SequelizeType, { QueryInterface } from "sequelize";

const initialBuyTime = Date.now() - 10000;
const nOfMockedStocks = 1000;

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
            const stockTypes = await queryInterface.sequelize.query<StockTypesAttributes>("SELECT * from \"tblStockTypes\"", { type: Sequelize.QueryTypes.SELECT, transaction });

            const mockStocks = [...Array(nOfMockedStocks).keys()].map((n) => {

                return {
                    typeId: stockTypes?.[0],
                    buyPrice: n + 0.01,
                    buyTime: new Date(initialBuyTime + 100 + n),
                    sellPrice: 2,
                    sellTime: new Date(),
                    updatedAt: new Date(),
                    createdAt: new Date(),
                };
            });
            await queryInterface.bulkInsert("tblStocks", mockStocks, { transaction });
        });

    },

    down: async (queryInterface: QueryInterface, Sequelize: typeof SequelizeType) => {
        await queryInterface.bulkDelete("tblStocks", { createdAt: { [Sequelize.Op.in]: baseStocks.map(r => r.createdAt) } });
    }
};
