import { TblCategories } from "@db/models";
import { ModelToDTO } from "@db/ModelToDTO";
import { BaseRepository } from "./BaseRepository";

export type CategoriesDTO = ModelToDTO<TblCategories>;

function mapTableToDTO(model: TblCategories): CategoriesDTO {
  return {
    id: model.id,
    category: model.category,
    previewName: model.previewName,
    languageId: model.languageId
  };
}

export const CategoriesRepo = new BaseRepository({
  table: TblCategories,
  mapTableToDTO,
});
