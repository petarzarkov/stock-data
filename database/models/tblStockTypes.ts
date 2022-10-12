import { InferAttributes, InferCreationAttributes } from "sequelize";
import { Default, Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";

export type StockTypesAttributes = InferAttributes<TblStockTypes, { omit: "deletedAt" | "version" }>;
export type StockTypesCreationAttributes = InferCreationAttributes<TblStockTypes, { omit: "id" | "deletedAt" | "version" }>;

@Table({
    tableName: "tblStockTypes",
    timestamps: true,
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

export default TblStockTypes;
