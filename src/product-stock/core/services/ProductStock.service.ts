import { IPagination, IPaginationFilter, IProductStock, IProductStockService } from '../domain';
import { IProductStockRepository } from '../domain/ports/repositories/IProductStock.repository';

export class ProductStockService implements IProductStockService {
  constructor(private readonly productStockRepository: IProductStockRepository) {}
  async getAll(
    args: Pick<IProductStock, 'name' | 'sku' | 'description'> & IPaginationFilter
  ): Promise<IPagination<IProductStock>> {
    const filters = {
      sku: args.sku,
      name: args.name,
      description: args.description
    };

    const [data, count] = await Promise.all([
      this.productStockRepository.getAll({
        filters,
        pagination: {
          page: args.page,
          per_page: args.per_page
        }
      }),
      this.productStockRepository.count(filters)
    ]);

    return {
      data,
      meta_data: {
        count,
        page: args.page,
        per_page: args.per_page
      }
    };
  }

  getOne(id: string): Promise<IProductStock | null> {
    const data = this.productStockRepository.getOne(id);

    return data;
  }

  async update(
    args: Partial<IProductStock> & { id: string }
  ): Promise<Partial<IProductStock> | null> {
    return this.productStockRepository.update(args);
  }

  create(args: Omit<IProductStock, 'id'>): Promise<IProductStock> {
    return this.productStockRepository.create(args);
  }

  delete(id: IProductStock['id']): Promise<boolean> {
    return this.productStockRepository.delete(id);
  }
}
