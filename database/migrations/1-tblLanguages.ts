import SequelizeType, { QueryInterface, DataTypes, literal } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface, Sequelize: typeof SequelizeType) => {
    await queryInterface.createTable("tblLanguages", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: literal("gen_random_uuid()")
      },
      lang: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING(128)
      },
      previewName: {
        allowNull: true,
        type: Sequelize.STRING(256)
      },
    });
  },
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable("tblLanguages", { force: true });
  }
};
