import { TblStocks, StockAttributes } from "@db/models";
import { BaseSequelizeRepo } from "hot-utils";

function mapTableToDTO(model: TblStocks): StockAttributes {
    return {
        id: model.id,
        typeId: model.typeId,
        buyPrice: model.buyPrice,
        buyTime: model.buyTime,
        sellPrice: model.sellPrice,
        sellTime: model.sellTime
    };
}

export const StocksRepo = new BaseSequelizeRepo({
    table: TblStocks,
    mapTableToDTO,
    logger: { enabled: true }
});
