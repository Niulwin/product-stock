import { FastifyRequest } from 'fastify';
import {
  IPagination,
  IPaginationFilter,
  IProductStock,
  IProductStockController,
  IProductStockService
} from '../../../core';

export class ProductStockController implements IProductStockController {
  constructor(private readonly productStockService: IProductStockService) {}

  async getAll(
    req: FastifyRequest<{ Querystring: IProductStock & IPaginationFilter }>
  ): Promise<IPagination<IProductStock>> {
    return this.productStockService.getAll({
      name: req.query.name,
      sku: req.query.sku,
      description: req.query.description,
      page: req.query.page,
      per_page: req.query.per_page
    });
  }

  async getOne(
    req: FastifyRequest<{ Params: Pick<IProductStock, 'id'> }>
  ): Promise<IProductStock | null> {
    return this.productStockService.getOne(req.params.id);
  }

  async update(
    req: FastifyRequest<{ Params: Pick<IProductStock, 'id'>; Body: Partial<IProductStock> }>
  ): Promise<Partial<IProductStock> | null> {
    return this.productStockService.update({
      id: req.params.id,
      description: req.body.description,
      name: req.body.name,
      sku: req.body.sku,
      tags: req.body.tags,
      image: req.body.image,
      price: req.body.price,
      stock: req.body.stock
    });
  }

  async create(req: FastifyRequest<{ Body: Omit<IProductStock, 'id'> }>): Promise<IProductStock> {
    return this.productStockService.create({
      description: req.body.description,
      name: req.body.name,
      sku: req.body.sku,
      image: req.body.image,
      price: req.body.price,
      stock: req.body.stock,
      tags: req.body.tags
    });
  }

  async delete(req: FastifyRequest<{ Params: Pick<IProductStock, 'id'> }>): Promise<boolean> {
    return this.productStockService.delete(req.params.id);
  }
}
