import { InferAttributes, InferCreationAttributes } from "sequelize";
import { Default, Column, DataType, Model, PrimaryKey, Table, HasOne } from "sequelize-typescript";
import TblStockTypes from "./tblStockTypes";

export type StockAttributes = InferAttributes<TblStocks, { omit: "deletedAt" | "version" }>;
export type StockCreationAttributes = InferCreationAttributes<TblStocks, { omit: "id" | "deletedAt" | "version" }>;

@Table({
    tableName: "tblStocks",
    timestamps: true,
    deletedAt: false,
    version: false
})
export class TblStocks extends Model<StockAttributes, StockCreationAttributes> {
    @PrimaryKey
    @Column({ autoIncrement: false, type: DataType.UUID, defaultValue: DataType.UUIDV4 })
    declare public id: string;

    @HasOne(() => TblStockTypes, { foreignKey: "id", sourceKey: "type", as: "tblStockTypes" })
    @Column({ allowNull: false, type: DataType.UUID })
    declare public typeId: string;

    @Column({
        allowNull: false,
        type: DataType.DATE(3)
    })
    declare public buyTime: Date;

    @Column({
        allowNull: false,
        type: DataType.DECIMAL(8, 2)
    })
    declare public buyPrice: number;

    @Column({
        allowNull: false,
        type: DataType.DATE(3)
    })
    declare public sellTime: Date;

    @Column({
        allowNull: false,
        type: DataType.DECIMAL(8, 2)
    })
    declare public sellPrice: number;

    @Default(new Date())
    @Column({
        allowNull: true,
        type: DataType.DATE(3)
    })
    declare public createdAt: Date;

    @Column({
        allowNull: true,
        type: DataType.DATE(3)
    })
    declare public updatedAt?: Date;

}

export default TblStocks;
