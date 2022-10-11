import { Default, Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
    tableName: "tblStock",
    timestamps: true
})
export class TblStock extends Model {

    @PrimaryKey
    @Column({ autoIncrement: false, type: DataType.UUID, defaultValue: DataType.UUIDV4 })
    declare public id: string;

    @Column({
        allowNull: false,
        type: DataType.STRING(128),
        unique: true
    })
    declare public category: string;

    @Default("GeneralKnowledge")
    @Column({ allowNull: true, type: DataType.STRING(256) })
    declare public previewName?: string;
}

export default TblStock;
