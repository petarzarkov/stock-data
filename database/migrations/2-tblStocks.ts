import SequelizeType, { DataTypes, literal, QueryInterface } from "sequelize";

module.exports = {
    up: async (queryInterface: QueryInterface, Sequelize: typeof SequelizeType) => {
        await queryInterface.createTable("tblStocks", {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: literal("gen_random_uuid()")
            },
            categoryId: {
                allowNull: false,
                type: Sequelize.UUID,
                references: {
                    model: "tblStockTypes",
                    key: "id"
                }
            },
            buyTime: {
                allowNull: false,
                type: Sequelize.DATE(3)
            },
            buyPrice: {
                allowNull: false,
                type: Sequelize.DECIMAL(8, 2)
            },
            sellTime: {
                allowNull: false,
                type: Sequelize.DATE(3)
            },
            sellPrice: {
                allowNull: false,
                type: Sequelize.DECIMAL(8, 2)
            },
            createdAt: {
                allowNull: true,
                type: Sequelize.DATE(3),
                defaultValue: new Date()
            },
            updatedAt: {
                allowNull: true,
                type: Sequelize.DATE(3)
            },
        });
    },

    down: async (queryInterface: QueryInterface) => {
        await queryInterface.dropTable("tblStocks", { force: true });
    }
};