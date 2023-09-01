import { FastifyInstance } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import productStockRoutes from './productStock.route';

export function registerAppRoutes(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  _opts: { prefix: string },
  next: (err?: Error) => void
) {
  fastify.register(productStockRoutes, {
    prefix: 'products'
  });

  next();
}
