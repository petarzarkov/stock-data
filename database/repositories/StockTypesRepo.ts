import { TblStockTypes, StockTypesAttributes } from "@db/models";
import { BaseSequelizeRepo } from "hot-utils";

function mapTableToDTO(model: TblStockTypes): StockTypesAttributes {
    return {
        id: model.id,
        type: model.type
    };
}

export const StockTypesRepo = new BaseSequelizeRepo({
    table: TblStockTypes,
    mapTableToDTO,
    logger: { enabled: true }
});
