import { STOCKS_FROM, STOCKS_TO } from "@server/constants";
import { StockTypesAttributes, StockCreationAttributes } from "@db/models";
import SequelizeType, { QueryInterface } from "sequelize";

function getRandomArbitrary(min: number, max: number) {
    return Math.random() * (max - min) + min;
}
const priceDenom = () => getRandomArbitrary(0.1, 350);

const getMockStocks = (stockTypeIds: string[], discretionInterval = 1000): StockCreationAttributes[] => {
    const period = STOCKS_TO - STOCKS_FROM;
    // Number of stock records is based on the time period, where each stock record has a discretion interval of 1 second
    const stocksN = period / discretionInterval;
    const initialBuyPrice = priceDenom();
    return [...Array(stocksN).keys()].reduce((prev) => {

        const buyPrice = priceDenom();
        const buyTime = prev[prev.length - 1].buyTime + discretionInterval;
        return [...prev, {
            typeId: stockTypeIds[Math.floor(Math.random() * stockTypeIds.length)],
            buyPrice,
            buyTime,
            sellPrice: buyPrice + priceDenom(),
            sellTime: getRandomArbitrary(buyTime, STOCKS_TO)
        }];
    }, [{
        typeId: stockTypeIds[Math.floor(Math.random() * stockTypeIds.length)],
        buyPrice: initialBuyPrice,
        buyTime: STOCKS_FROM,
        sellPrice: initialBuyPrice + priceDenom(),
        sellTime: getRandomArbitrary(STOCKS_FROM, STOCKS_TO)
    }]);
};

module.exports = {
    up: async (queryInterface: QueryInterface, Sequelize: typeof SequelizeType) => {
        return queryInterface.sequelize.transaction(async transaction => {
            const stockTypes = await queryInterface.sequelize.query<StockTypesAttributes>("SELECT * from \"tblStockTypes\"", { type: Sequelize.QueryTypes.SELECT, transaction });
            if (!stockTypes.length) {
                throw new Error("Error fetching stock types from db");
            }

            const mockedStocks = getMockStocks(stockTypes.map(t => t.id));
            if (mockedStocks.length) {
                const insertChunks = mockedStocks.reduce((prev, item, index, arr) => {
                    // Let's split by 10%
                    const chunkIndex = Math.floor(index / (arr.length / 10));

                    if (!prev[chunkIndex]) {
                        prev[chunkIndex] = [] as unknown as [StockCreationAttributes]; // start a new chunk
                    }

                    prev[chunkIndex].push(item);

                    return prev;
                }, [] as [StockCreationAttributes][]);
                const promises = insertChunks.map(async chunk => {
                    return queryInterface.bulkInsert("tblStocks", chunk, { transaction, logging: false });
                });
                await Promise.all(promises);
            }
        });

    },

    down: async (queryInterface: QueryInterface) => {
        await queryInterface.dropTable("tblStocks", { force: true, cascade: true });
    }
};
