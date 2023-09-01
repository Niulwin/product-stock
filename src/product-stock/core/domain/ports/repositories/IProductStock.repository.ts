import { WithId } from 'mongodb';
import { IPaginationFilter, IProductStock } from '../../entities';

export interface IProductStockRepository {
  getAll(args: {
    filters: Pick<IProductStock, 'name' | 'sku' | 'description'>;
    pagination: IPaginationFilter;
  }): Promise<WithId<IProductStock[]>[]>;
  count(filters: Pick<IProductStock, 'name' | 'sku' | 'description'>): Promise<number>;
  getOne(id: IProductStock['id']): Promise<IProductStock | null>;
  update(args: Partial<IProductStock> & { id: string }): Promise<Partial<IProductStock> | null>;
  create(args: Omit<IProductStock, 'id'>): Promise<IProductStock>;
  delete(id: IProductStock['id']): Promise<boolean>;
}
