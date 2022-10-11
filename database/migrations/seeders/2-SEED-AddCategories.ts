import { CategoriesDTO, LanguagesDTO } from "@db/repositories";
import SequelizeType, { QueryInterface } from "sequelize";

const baseCategories: (Omit<CategoriesDTO, "id" | "languageId">)[] = [
  {
    category: "General Knowledge",
    previewName: "General Knowledge",
  },
  {
    category: "Celebrities",
    previewName: "Celebrities"
  },
];

module.exports = {
  up: async (queryInterface: QueryInterface, Sequelize: typeof SequelizeType) => {
    return queryInterface.sequelize.transaction(async transaction => {
      const languages = await queryInterface.sequelize.query<LanguagesDTO>("SELECT * from \"tblLanguages\"", { type: Sequelize.QueryTypes.SELECT, transaction });
      const cats = baseCategories.map(c => ({
        ...c,
        languageId: languages[0].id
      }));
      await queryInterface.bulkInsert("tblCategories", cats, { transaction });
    });

  },

  down: async (queryInterface: QueryInterface) => {
    return queryInterface.sequelize.transaction(async transaction => {
      await queryInterface.bulkDelete(
        "tblQuestions",
        {}, { transaction });
      await queryInterface.bulkDelete(
        "tblCategories",
        {}, { transaction });
    });
  }

};
