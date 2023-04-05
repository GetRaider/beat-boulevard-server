import { IUserModel } from "@interfaces/models/users.model";

export interface ICreateUserArgs {
  readonly email: string;
  readonly temporaryPassword: string;
  readonly name?: string;
  readonly age?: number;
}

export interface ICreateUserResult {
  readonly user: IUserModel;
}
