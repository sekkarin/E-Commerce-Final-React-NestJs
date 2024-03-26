import { Schema, model } from 'mongoose';
import * as mongoose from 'mongoose';

// สร้าง Schema สำหรับ Product
export const productSchema = new Schema(
  {
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    price: { type: Number, required: true },
    imageUrl: { type: String },
  },
  {
    timestamps: true,
  },
);

