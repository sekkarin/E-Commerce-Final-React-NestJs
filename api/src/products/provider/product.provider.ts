import { Connection } from 'mongoose';
import { productSchema } from '../schema/product.schema';

export const productProviders = [
  {
    provide: 'PRODUCT_MODEL',
    useFactory: (connection: Connection) => connection.model('Product', productSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];