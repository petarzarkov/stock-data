import { QueryInterface } from "sequelize";

const baseLangs = [{ lang: "en", previewName: "English" }];

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert("tblLanguages", baseLangs, {});
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete("tblLanguages", {});
  }
};
