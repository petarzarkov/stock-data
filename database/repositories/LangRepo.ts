import { TblLanguages } from "@db/models";
import { ModelToDTO } from "@db/ModelToDTO";
import { BaseRepository } from "./BaseRepository";

export type LanguagesDTO = ModelToDTO<TblLanguages>;

function mapTableToDTO(model: TblLanguages): LanguagesDTO {
  return {
    id: model.id,
    lang: model.lang,
    previewName: model.previewName
  };
}

export const LangRepo = new BaseRepository({
  table: TblLanguages,
  mapTableToDTO,
});
