import { InferAttributes, InferCreationAttributes } from "sequelize";
import { Column, DataType, Model, PrimaryKey, Table, HasOne } from "sequelize-typescript";
import TblStockTypes from "./tblStockTypes";

export type StockAttributes = InferAttributes<TblStocks, { omit: "deletedAt" | "version" | "createdAt" | "updatedAt" }>;
export type StockCreationAttributes = InferCreationAttributes<TblStocks, { omit: "id" | "deletedAt" | "version" | "createdAt" | "updatedAt" }>;

@Table({
    tableName: "tblStocks",
    timestamps: false,
    deletedAt: false,
    version: false
})
export class TblStocks extends Model<StockAttributes, StockCreationAttributes> {
    @PrimaryKey
    @Column({ autoIncrement: false, type: DataType.UUID, defaultValue: DataType.UUIDV4 })
    declare public id: string;

    @HasOne(() => TblStockTypes, { foreignKey: "id", sourceKey: "typeId", as: "tblStockTypes" })
    @Column({ allowNull: false, type: DataType.UUID })
    declare public typeId: string;

    @Column({
        allowNull: false,
        type: DataType.NUMBER
    })
    declare public buyTime: number;

    @Column({
        allowNull: false,
        type: DataType.DECIMAL(8, 2)
    })
    declare public buyPrice: number;

    @Column({
        allowNull: false,
        type: DataType.NUMBER
    })
    declare public sellTime: number;

    @Column({
        allowNull: false,
        type: DataType.DECIMAL(8, 2)
    })
    declare public sellPrice: number;
}

export default TblStocks;
