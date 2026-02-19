import { Schema, model, Document, Model } from "mongoose";
import { IUser } from "./user.interface";
import { passwordHashPlugin } from "../../shared/passwordHash";

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
userSchema.plugin(passwordHashPlugin);


// 4️⃣ Static method
userSchema.statics.isUserExistByEmail = async function (email: string) {
  return await this.findOne({ email }).select("+password");
};

export const User = model<IUserDocument, UserModel>("User", userSchema);
