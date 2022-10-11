import SequelizeType, { DataTypes, literal, QueryInterface } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface, Sequelize: typeof SequelizeType) => {
    await queryInterface.createTable("tblCategories", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: literal("gen_random_uuid()")
      },
      category: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING(128)
      },
      previewName: {
        allowNull: true,
        defaultValue: "GeneralKnowledge",
        type: Sequelize.STRING(256)
      },
      languageId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: "tblLanguages",
          key: "id"
        }
      },
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable("tblCategories", { force: true, cascade: true });
  }
};
