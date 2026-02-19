import bcrypt from "bcrypt";
import { Schema, model, Document, Model } from "mongoose";
import { IUser } from "./user.interface";

// 1️⃣ Document interface
export interface IUserDocument extends IUser, Document {}

// 2️⃣ Model interface
export interface UserModel extends Model<IUserDocument> {
  isUserExistByEmail(email: string): Promise<IUserDocument | null>;
}

const userSchema = new Schema<IUserDocument, UserModel>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6, select: false }
  },
  { timestamps: true }
);

// 3️⃣ Password hash hook
userSchema.pre<IUserDocument>("save", async function () {
  // ✅ TypeScript now recognizes isModified because this extends Document
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});

// 4️⃣ Static method
userSchema.statics.isUserExistByEmail = async function (email: string) {
  return await this.findOne({ email }).select("+password");
};

export const User = model<IUserDocument, UserModel>("User", userSchema);
