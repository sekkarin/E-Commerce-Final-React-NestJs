import * as mongoose from 'mongoose';

export const cartSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    email: { type: String, require: true },
    price: { type: Number, require: true },
    name: { type: String, require: true },
    image: { type: String, require: true },
    quantity: { type: Number, require: true },
  },
  {
    timestamps: true,
  },
);
