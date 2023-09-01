import { Collection } from 'mongodb';
import { IProductStock } from './IProductStock.entity';

export type ICollections = {
  products: Collection<IProductStock>;
};
