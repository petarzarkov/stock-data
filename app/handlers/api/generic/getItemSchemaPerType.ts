import { questionSchema, categorySchema, languageSchema } from "@app/handlers";

export const getItemSchemaPerType = (type: string) => {
  switch (type) {
    case "question":
      return questionSchema;
    case "language":
      return languageSchema;
    case "category":
      return categorySchema;
  }
};