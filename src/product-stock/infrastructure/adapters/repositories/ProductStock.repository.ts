import { ObjectId, WithId } from 'mongodb';
import { IPaginationFilter, IProductStock, IProductStockRepository } from '../../../core';
import { Database } from '../databases';

export class ProductStockRepository implements IProductStockRepository {
  constructor(private readonly database: Database) {}

  async getAll(args: {
    filters: Pick<IProductStock, 'name' | 'sku' | 'description'>;
    pagination: IPaginationFilter;
  }): Promise<WithId<IProductStock[]>[]> {
    const { filters, pagination } = args;
    return this.database
      .getCollection<IProductStock[]>('products')
      .find({
        ...(filters?.name ? { name: new RegExp(filters.name, 'i') } : {}),
        ...(filters?.sku ? { sku: new RegExp(filters.sku, 'i') } : {}),
        ...(filters?.description ? { description: new RegExp(filters.description, 'i') } : {})
      })
      .skip(pagination.page * pagination.per_page)
      .limit(pagination.per_page)
      .toArray();
  }

  async count(filters: Pick<IProductStock, 'name' | 'sku' | 'description'>): Promise<number> {
    return this.database.getCollection('products').countDocuments({
      ...(filters?.name ? { name: new RegExp(filters.name, 'i') } : {}),
      ...(filters?.sku ? { sku: new RegExp(filters.sku, 'i') } : {}),
      ...(filters?.description ? { description: new RegExp(filters.description, 'i') } : {})
    });
  }

  async getOne(id: IProductStock['id']): Promise<IProductStock | null> {
    const data = await this.database
      .getCollection<IProductStock>('products')
      .findOne({ _id: new ObjectId(id) });

    return data
      ? {
          ...data,
          id: String(data?._id)
        }
      : null;
  }

  async update(
    args: Partial<IProductStock> & { id: string }
  ): Promise<Partial<IProductStock> | null> {
    const { id, ...rest } = args;
    console.log(args);
    const { value } = await this.database.getCollection<IProductStock>('products').findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...rest
        }
      }
    );

    return {
      id: String(id),
      ...value
    };
  }

  async create(args: Omit<IProductStock, 'id'>): Promise<IProductStock> {
    const { insertedId } = await this.database
      .getCollection<Omit<IProductStock, 'id'>>('products')
      .insertOne(args);
    return { id: String(insertedId), ...args };
  }

  async delete(id: IProductStock['id']): Promise<boolean> {
    await this.database
      .getCollection<Omit<IProductStock, 'id'>>('products')
      .deleteOne({ _id: new ObjectId(id) });
    return true;
  }
}
