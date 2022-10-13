import { stockSchema, stockTypeSchema } from "@app/handlers";

export const getItemSchemaPerType = (type: string) => {
    const map = {
        stock: stockSchema,
        "stock/types": stockTypeSchema
    };

    return map[type as keyof typeof map];
};