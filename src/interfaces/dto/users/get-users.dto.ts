import {IUserModel} from "@interfaces/models/user.model";

export interface IGetUsersArgs {
  readonly email?: string;
  readonly temporaryPassword?: string;
  readonly name?: string;
  readonly age?: number;
}

export interface IGetUsersResult {
  readonly users: Array<IUserModel>;
}
