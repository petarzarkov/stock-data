import SequelizeType, { DataTypes, literal, QueryInterface } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface, Sequelize: typeof SequelizeType) => {
    await queryInterface.createTable("tblQuestions", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: literal("gen_random_uuid()")
      },
      question: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING(1024)
      },
      difficulty: {
        defaultValue: "easy",
        allowNull: true,
        type: Sequelize.STRING(64)
      },
      correctAnswer: {
        allowNull: false,
        type: Sequelize.STRING(256)
      },
      incorrectAnswers: {
        allowNull: false,
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      categoryId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: "tblCategories",
          key: "id"
        }
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
    await queryInterface.dropTable("tblQuestions", { force: true });
  }
};