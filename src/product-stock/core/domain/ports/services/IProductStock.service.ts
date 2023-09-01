import { IPagination, IPaginationFilter, IProductStock } from '../../entities';

export interface IProductStockService {
  getAll(
    args: Pick<IProductStock, 'name' | 'sku' | 'description'> & IPaginationFilter
  ): Promise<IPagination<IProductStock>>;
  getOne(id: string): Promise<IProductStock | null>;
  update(args: Partial<IProductStock> & { id: string }): Promise<Partial<IProductStock> | null>;
  create(args: Omit<IProductStock, 'id'>): Promise<IProductStock>;
  delete(id: IProductStock['id']): Promise<boolean>;
}
