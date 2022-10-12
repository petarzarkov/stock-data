import { TblStockTypes, StockTypesAttributes } from "@db/models";
import { BaseSequelizeRepo } from "hot-utils";

function mapTableToDTO(model: TblStockTypes): StockTypesAttributes {
    return {
        id: model.id,
        type: model.type,
        createdAt: model.createdAt,
        updatedAt: model.updatedAt
    };
}

export const StockTypesRepo = new BaseSequelizeRepo({
    table: TblStockTypes,
    mapTableToDTO,
    logger: { enabled: true }
});
