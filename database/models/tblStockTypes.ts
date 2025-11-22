import { InferAttributes, InferCreationAttributes } from "sequelize";
import { Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";

export type StockTypesAttributes = InferAttributes<TblStockTypes, { omit: "deletedAt" | "version" | "createdAt" | "updatedAt" }>;
export type StockTypesCreationAttributes = InferCreationAttributes<TblStockTypes, { omit: "id" | "deletedAt" | "version" | "createdAt" | "updatedAt" }>;

@Table({
    tableName: "tblStockTypes",
    timestamps: false,
    deletedAt: false,
    version: false
})
export class TblStockTypes extends Model<StockTypesAttributes, StockTypesCreationAttributes> {
    @PrimaryKey
    @Column({ autoIncrement: false, type: DataType.UUID, defaultValue: DataType.UUIDV4 })
    declare public id: string;

    @Column({
        allowNull: false,
        type: DataType.STRING(128),
        unique: true
    })
    declare public type: string;
}

export default TblStockTypes;
