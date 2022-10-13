import { STOCKS_FROM, STOCKS_TO } from "@app/constants";
import { StockTypesAttributes, StockCreationAttributes } from "@db/models";
import SequelizeType, { QueryInterface } from "sequelize";

let mockedStocks: StockCreationAttributes[] | undefined;

function getRandomArbitrary(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

const getMockStocks = (stockTypeIds: string[], discretionInterval = 1000): StockCreationAttributes[] => {
    const from = new Date(STOCKS_FROM);
    const to = new Date(STOCKS_TO);
    // Number of stock records is based on the time period, where each stock record has a discretion interval of 1 second
    const stocksN = ((to.getTime() - from.getTime()) / discretionInterval);
    const initialBuyPrice = getRandomArbitrary(0.1, 350);
    return [...Array(stocksN).keys()].reduce((prev) => {

        const buyPrice = getRandomArbitrary(0.1, 350);
        const buyTime = new Date(prev[prev.length - 1].buyTime.getTime() + discretionInterval);
        return [...prev, {
            typeId: stockTypeIds[Math.floor(Math.random() * stockTypeIds.length)],
            buyPrice,
            buyTime,
            sellPrice: buyPrice + getRandomArbitrary(0.1, 350),
            sellTime: new Date(buyTime.getTime() + getRandomArbitrary(1000 * 5, to.getTime() - from.getTime())),
            updatedAt: new Date(),
            createdAt: new Date(),
        }];
    }, [{
        typeId: stockTypeIds[Math.floor(Math.random() * stockTypeIds.length)],
        buyPrice: initialBuyPrice,
        buyTime: from,
        sellPrice: initialBuyPrice + getRandomArbitrary(0.1, 350),
        sellTime: new Date(from.getTime() + getRandomArbitrary(1000 * 5, to.getTime() - from.getTime())),
        updatedAt: new Date(),
        createdAt: new Date(),
    }]);
};

module.exports = {
    up: async (queryInterface: QueryInterface, Sequelize: typeof SequelizeType) => {
        return queryInterface.sequelize.transaction(async transaction => {
            const stockTypes = await queryInterface.sequelize.query<StockTypesAttributes>("SELECT * from \"tblStockTypes\"", { type: Sequelize.QueryTypes.SELECT, transaction });

            if (!stockTypes.length) {
                throw new Error("Error fetching stock types from db");
            }

            mockedStocks = getMockStocks(stockTypes.map(t => t.id));

            if (mockedStocks.length) {
                console.log("mockedStocks length", mockedStocks.length);
                const insertChunks = mockedStocks.reduce((prev, item, index, arr) => {
                    // Let's split by 10%
                    const chunkIndex = Math.floor(index / (arr.length / 10));

                    if (!prev[chunkIndex]) {
                        prev[chunkIndex] = [] as unknown as [StockCreationAttributes]; // start a new chunk
                    }

                    prev[chunkIndex].push(item);

                    return prev;
                }, [] as [StockCreationAttributes][]);
                console.log("insertChunks length", insertChunks.length);
                const promises = insertChunks.map(async chunk => {
                    console.log("chunk length", chunk.length);
                    return queryInterface.bulkInsert("tblStocks", chunk, { transaction, logging: false });
                });
                await Promise.all(promises);
            }
        });

    },

    down: async (queryInterface: QueryInterface, Sequelize: typeof SequelizeType) => {
        if (mockedStocks) {
            await queryInterface.bulkDelete("tblStocks", { createdAt: { [Sequelize.Op.in]: mockedStocks.map(r => r.createdAt) } });
        }
    }
};
