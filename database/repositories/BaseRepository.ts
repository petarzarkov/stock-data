import { Model, Repository } from "sequelize-typescript";
import { Attributes, FindOptions, Order, Transaction, WhereOptions, UpdateOptions, Op } from "sequelize";
import { MakeNullishOptional } from "sequelize/types/utils";
import { HotLogger } from "hot-utils";
import { withError, withResult } from "@contracts/APIResults";

const log = HotLogger.createLogger("@db/BaseRepo");
interface IBaseRepo<ModelClass, ModelDTO> {
  table: Repository<ModelClass>;
  mapTableToDTO: (model: ModelClass) => ModelDTO;
}

type CommonCommanderOpts<CommandReturnType> = {
  requestId?: string;
  command: (logging?: (sql: string, timing?: number | undefined) => void ) => Promise<CommandReturnType>;
  commandName?: string;
};

export class BaseRepository<ModelClass extends Model<ModelClass, ModelDTO>, ModelDTO extends { id: string }> {
  public table: Repository<ModelClass>;
  public tableName: string;
  public mapTableToDTO: (model: ModelClass) => ModelDTO;

  constructor({ table, mapTableToDTO }: IBaseRepo<ModelClass, ModelDTO>) {
    if (!table) {
      const error = "Missing table model!";
      log.warn(error);
      throw new Error(error);
    }

    this.table = table;
    this.tableName = table.tableName || table.name;
    this.mapTableToDTO = mapTableToDTO;
  }

  public commit = async <CommandReturnType>({ command, requestId, commandName }: CommonCommanderOpts<CommandReturnType>) => {
    const commandQuery: { query?: string; time?: number } = {};
    try {
      const res = await command((query, time) => {
        commandQuery.query = query;
        commandQuery.time = time;
      });
      return withResult<CommandReturnType>(res);
    } catch (error) {
      log.error(`Error executing ${this.tableName}.${commandName || "command"}`, {
        err: <Error>error,
        requestId,
        tableName: this.tableName,
        ...commandQuery && commandQuery
      });
      return withError(error);
    }
  };

  public count = async ({ where, requestId }: { where?: Partial<ModelDTO>; requestId?: string }) => {
    return this.commit<number>({
      requestId,
      commandName: this.count.name,
      command: () => this.table.count(<FindOptions<ModelClass>>{ where })
    });
  };

  public create = async ({ dto, transaction, requestId }: { dto: Omit<ModelDTO, "id"> & { id?: number }; transaction?: Transaction; requestId?: string }) => {
    return this.commit<ModelDTO | null>({
      requestId,
      commandName: this.create.name,
      command: () => this.table.create({
        ...dto,
        id: dto.id,
      } as unknown as MakeNullishOptional<ModelClass["_creationAttributes"]>,
      { transaction })
        .then(r => r ? this.mapTableToDTO(r) : null)
    });
  };

  public update = async ({ dto, transaction, where, requestId }: { dto: Omit<ModelDTO, "id"> & { id?: number }; where: Partial<ModelDTO>; transaction?: Transaction; requestId?: string }) => {
    return this.commit<boolean>({
      requestId,
      commandName: this.update.name,
      command: () => this.table.update({
        ...dto,
        id: dto.id,
      } as unknown as MakeNullishOptional<ModelClass["_creationAttributes"]>,
      { where, transaction } as unknown as UpdateOptions<ModelClass>)
        .then(r => r[0] ? r[0] > 0 : false)
    });
  };

  public createBulk = async ({ dtos, transaction, requestId }: { dtos: (Omit<ModelDTO, "id"> & { id?: string })[]; transaction?: Transaction; requestId?: string }) => {
    const attributeKeys = Object.keys(this.table.getAttributes()).filter(key => key !== "id") as unknown as (keyof ModelClass)[];
    return this.commit<ModelDTO[] | null>({
      requestId,
      commandName: this.createBulk.name,
      command: (logging) => this.table.bulkCreate(dtos as unknown as MakeNullishOptional<ModelClass["_creationAttributes"]>[],
        {
          transaction,
          ignoreDuplicates: false,
          updateOnDuplicate: attributeKeys,
          returning: true,
          logging
        })
        .then(r => r ? r.map(this.mapTableToDTO) : null)
    });
  };

  public getAll = async ({ requestId, order, where }: { order?: Order; requestId?: string; where?: Partial<ModelDTO> } = {}) => {
    return this.commit<ModelDTO[] | null>({
      requestId,
      commandName: this.getAll.name,
      command: () => this.table.findAll({ where: where as unknown as WhereOptions<Attributes<ModelClass>>, order })
        .then(e => e.length ? e?.map(this.mapTableToDTO) : null)
    });
  };

  public getLast = async ({ requestId }: { requestId?: string } = {}) => {
    return this.commit<ModelDTO | null>({
      requestId,
      commandName: this.getLast.name,
      command: () => this.table.findOne({ order: [["id", "DESC"]] })
        .then(r => r && this.mapTableToDTO(r))
    });
  };

  public getById = async ({ id, requestId }: { id: string; requestId?: string }) => {
    return this.commit<ModelDTO | null>({
      requestId,
      commandName: this.getById.name,
      command: () => this.table.findOne({ where: { id } })
        .then(r => r && this.mapTableToDTO(r))
    });
  };

  public delById = async ({ id, requestId }: { id: string; requestId?: string }) => {
    return this.commit<number>({
      requestId,
      commandName: this.delById.name,
      command: () => this.table.destroy({ where: { id } })
    });
  };

  public delByIds = async ({ ids, requestId }: { ids: string[]; requestId?: string }) => {
    return this.commit<number>({
      requestId,
      commandName: this.delByIds.name,
      command: (logging) => this.table.destroy({ where: { id: { [Op.in]: ids } }, logging })
    });
  };

  public findOne = async ({ where, order, requestId }: { where: Partial<ModelDTO>; order?: Order; requestId?: string }) => {
    return this.commit<ModelDTO | null>({
      requestId,
      commandName: this.findOne.name,
      command: () => this.table.findOne({ where: where as unknown as WhereOptions<Attributes<ModelClass>>, order })
        .then(r => r && this.mapTableToDTO(r))
    });
  };

}
