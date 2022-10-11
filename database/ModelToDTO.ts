import { Expand } from "hot-utils";
import { InferCreationAttributes } from "sequelize";
import { Model } from "sequelize-typescript";

export type ModelToDTO<MyModel extends Model> = Expand<
InferCreationAttributes<MyModel, { omit: "createdAt" | "updatedAt" | "deletedAt" | "version" }>
>;