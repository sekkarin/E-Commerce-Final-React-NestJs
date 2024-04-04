import { Schema } from 'mongoose';

export const productSchema = new Schema(
  {
    category: {
      type: String,
      required: true,
    },
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    price: { type: Number, required: true },
    image: { type: String },
  },
  {
    timestamps: true,
  },
);
