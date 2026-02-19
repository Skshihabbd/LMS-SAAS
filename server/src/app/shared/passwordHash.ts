import { Schema } from "mongoose";
import bcrypt from "bcrypt";

export function passwordHashPlugin<
  T extends { password?: string }
>(schema: Schema<T>) {

  schema.pre("save", async function () {

    // 👇 explicitly cast করছি
    const doc = this as T;

    if (!("password" in doc)) return;

    if (typeof doc.password !== "string") return;

    if (!this.isModified("password")) return;

    doc.password = await bcrypt.hash(doc.password, 10);
  });

}
