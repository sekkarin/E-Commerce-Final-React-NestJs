import { Document } from 'mongoose';

export interface Cart extends Document {
  productId: string;
  email: string;
  name: string;
  image: string;
  quantity: string;
}
