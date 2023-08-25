import {IUserModel} from "@interfaces/models/user.model";

export interface IGetUsersArgs {
  readonly id?: Array<string>;
  readonly email?: Array<string>;
  readonly name?: Array<string>;
  readonly age?: Array<number>;
}

export interface IGetUsersResult {
  readonly users: Array<IUserModel>;
}
