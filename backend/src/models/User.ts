import mongoose, { Document, Schema } from "mongoose";

// This tells TypeScript what a user should contain.
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

// This tells MongoDB what fields to store for every user.
const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    // This adds createdAt and updatedAt automatically.
    timestamps: true,
  },
);

// This User model is used in controllers to create and find users.
export default mongoose.model<IUser>("User", UserSchema);
