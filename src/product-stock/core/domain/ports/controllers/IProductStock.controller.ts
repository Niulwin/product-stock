import { FastifyRequest } from 'fastify';
import { IPagination, IPaginationFilter, IProductStock } from '../../entities';

export interface IProductStockController {
  getAll(
    req: FastifyRequest<{
      Params: Pick<IProductStock, 'id'>;
      Querystring: IProductStock & IPaginationFilter;
    }>
  ): Promise<IPagination<IProductStock>>;
  getOne(req: FastifyRequest<{ Params: Pick<IProductStock, 'id'> }>): Promise<IProductStock | null>;
  update(args: Partial<IProductStock> & { id: string }): Promise<Partial<IProductStock> | null>;
  create(req: FastifyRequest<{ Body: IProductStock }>): Promise<IProductStock>;
  delete(req: FastifyRequest<{ Params: Pick<IProductStock, 'id'> }>): Promise<boolean>;
}
