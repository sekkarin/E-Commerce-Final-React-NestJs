import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    email: {
      type: String,
      require: true,
      trim: true,
      minLength: 3,
      unique: true,
    },
    photoURL: { type: String, require: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
  },
  {
    timestamps: true,
  },
);
