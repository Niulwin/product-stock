import { FastifyInstance, FastifyRequest } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import { IPaginationFilter, IProductStock } from 'src/product-stock/core';
import { productStockController } from '../di';
import {
  allProductStockSchema,
  createProductStockSchema,
  deleteProductStockSchema,
  productStockByIdSchema,
  updateProductStockSchema
} from '../schemas';

export default function batchDeliverRoutes(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  _opts: { prefix: string },
  next: (err?: Error) => void
) {
  fastify.get('/', {
    schema: allProductStockSchema,
    handler: (req: FastifyRequest<{ Querystring: IProductStock & IPaginationFilter }>) =>
      productStockController.getAll(req)
  });

  fastify.get('/:id', {
    schema: productStockByIdSchema,
    handler: (req: FastifyRequest<{ Params: Pick<IProductStock, 'id'> }>) =>
      productStockController.getOne(req)
  });

  fastify.patch('/:id', {
    schema: updateProductStockSchema,
    handler: (
      req: FastifyRequest<{ Params: Pick<IProductStock, 'id'>; Body: Partial<IProductStock> }>
    ) => productStockController.update(req)
  });

  fastify.post('/', {
    schema: createProductStockSchema,
    handler: (req: FastifyRequest<{ Body: IProductStock }>) => productStockController.create(req)
  });

  fastify.delete('/:id', {
    schema: deleteProductStockSchema,
    handler: (req: FastifyRequest<{ Params: Pick<IProductStock, 'id'> }>) =>
      productStockController.delete(req)
  });

  next();
}
