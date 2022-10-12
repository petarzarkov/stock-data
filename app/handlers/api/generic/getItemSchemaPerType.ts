import { stockSchema } from "@app/handlers";

export const getItemSchemaPerType = (type: string) => {
    const map = {
        stock: stockSchema
    };

    return map[type as keyof typeof map];
};