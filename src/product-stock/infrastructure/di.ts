import { ProductStockService } from '../core';
import { Database, ProductStockController, ProductStockRepository } from './adapters';
import { envVariableValidator } from './utils';

// Variables
const envVariables = {
  AWS_REGION: process.env.AWS_REGION ?? ''
};

// Methods
envVariableValidator(envVariables);

// Databases
const database = Database.getInstance();

// Repositories
const productStockRepository = new ProductStockRepository(database);

// Services
const productStockService = new ProductStockService(productStockRepository);

// Controllers
export const productStockController = new ProductStockController(productStockService);
