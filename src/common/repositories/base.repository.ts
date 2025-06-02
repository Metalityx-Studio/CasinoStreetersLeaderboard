import { Model, Document, FilterQuery, UpdateQuery } from 'mongoose';

export interface BaseDocument extends Document {
  is_deleted: boolean;
  deleted_at?: Date;
}

export abstract class BaseRepository<T extends BaseDocument> {
  constructor(protected readonly model: Model<T>) {}

  async create(doc: Partial<T>): Promise<T> {
    const user = await this.model.create(doc);

    return user;
  }

  async findById(id: string): Promise<T> {
    return await this.model.findOne({
      _id: id,
      is_deleted: false,
    });
  }

  async findOne(filter: FilterQuery<T>): Promise<T> {
    return await this.model.findOne({
      ...filter,
      is_deleted: false,
    });
  }

  async find(filter: FilterQuery<T> = {}): Promise<T[]> {
    return await this.model.find({
      ...filter,
      is_deleted: false,
    });
  }

  async update(id: string, update: UpdateQuery<T>): Promise<T> {
    return await this.model.findOneAndUpdate(
      {
        _id: id,
        is_deleted: false,
      },
      update,
      { new: true },
    );
  }

  async delete(id: string): Promise<T> {
    await this.model.findOneAndUpdate(
      {
        _id: id,
        is_deleted: false,
      },
      {
        is_deleted: true,
        deleted_at: new Date(),
      },
      { new: true },
    );

    return null;
  }

  async count(filter: FilterQuery<T> = {}): Promise<number> {
    return await this.model.countDocuments({
      ...filter,
      is_deleted: false,
    });
  }

  async findOneAndUpdate(
    filter: FilterQuery<T>,
    update: UpdateQuery<T>,
  ): Promise<T> {
    return await this.model.findOneAndUpdate(filter, update, {
      new: true,
    });
  }
}
