import { SchemaCompiler, defaultQueryString } from './schema';

export const allProductStockSchema: SchemaCompiler['schema'] = {
  querystring: {
    type: 'object',
    properties: {
      ...defaultQueryString,
      name: { type: 'string' },
      sku: { type: 'string' },
      description: { type: 'string' }
    }
  }
};

export const productStockByIdSchema: SchemaCompiler['schema'] = {
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string' }
    }
  }
};

export const updateProductStockSchema: SchemaCompiler['schema'] = {
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string' }
    }
  },
  body: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      description: { type: 'string' },
      sku: { type: 'string' },
      image: { type: 'string' },
      tags: {
        type: 'array',
        items: {
          type: 'string'
        }
      },
      price: { type: 'number' },
      stock: { type: 'number' }
    }
  }
};

export const createProductStockSchema: SchemaCompiler['schema'] = {
  body: {
    type: 'object',
    required: ['name', 'description', 'sku', 'image', 'price', 'stock'],
    properties: {
      name: { type: 'string' },
      description: { type: 'string' },
      sku: { type: 'string' },
      image: { type: 'string' },
      tags: {
        type: 'array',
        items: {
          type: 'string'
        }
      },
      price: { type: 'number' },
      stock: { type: 'number' }
    }
  }
};

export const deleteProductStockSchema: SchemaCompiler['schema'] = {
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string' }
    }
  }
};
