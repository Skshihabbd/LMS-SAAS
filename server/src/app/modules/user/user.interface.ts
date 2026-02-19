
export interface IUser {
  name: string;
  email: string;
  password: string;
}
// export interface IUserDocument extends IUser, Document {}


// export interface UserModel extends Model<IUserDocument> {
//   isUserExistByEmail(email: string): Promise<IUserDocument | null>;
// }
