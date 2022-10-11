import { CategoriesDTO, LanguagesDTO } from "@db/repositories";
import SequelizeType, { QueryInterface } from "sequelize";

const baseQuestions = [{
  difficulty: "medium",
  question: "What was the cause of death for Freddie Mercury?",
  correctAnswer: "Pneumonia",
  incorrectAnswers: [
    "Stomach Cancer",
    "HIV",
    "Brain Hemorrhage"
  ]
}];

module.exports = {
  up: async (queryInterface: QueryInterface, Sequelize: typeof SequelizeType) => {
    return queryInterface.sequelize.transaction(async transaction => {
      const languages = await queryInterface.sequelize.query<LanguagesDTO>("SELECT * from \"tblLanguages\"", { type: Sequelize.QueryTypes.SELECT, transaction });
      const categories = await queryInterface.sequelize.query<CategoriesDTO>("SELECT * from \"tblCategories\"", { type: Sequelize.QueryTypes.SELECT, transaction });
      const questions = baseQuestions.map(q => ({
        ...q,
        categoryId: categories[0].id,
        languageId: languages[0].id
      }));
      await queryInterface.bulkInsert("tblQuestions", questions, { transaction });
    });

  },

  down: async (queryInterface: QueryInterface, Sequelize: typeof SequelizeType) => {
    await queryInterface.bulkDelete("tblQuestions", { question: { [Sequelize.Op.in]: baseQuestions.map(r => r.question) } });
  }
};
