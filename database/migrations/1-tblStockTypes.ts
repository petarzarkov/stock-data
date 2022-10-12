import SequelizeType, { DataTypes, literal, QueryInterface } from "sequelize";

module.exports = {
    up: async (queryInterface: QueryInterface, Sequelize: typeof SequelizeType) => {
        await queryInterface.createTable("tblStockTypes", {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: literal("gen_random_uuid()")
            },
            type: {
                allowNull: false,
                unique: true,
                type: Sequelize.STRING(128)
            },
        });
    },

    down: async (queryInterface: QueryInterface) => {
        await queryInterface.dropTable("tblStockTypes", { force: true });
    }
};