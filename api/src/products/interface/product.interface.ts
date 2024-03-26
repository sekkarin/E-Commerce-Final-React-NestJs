import { Document } from 'mongoose';
// สร้าง Interface สำหรับ Product
export interface Product extends Document {
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
}