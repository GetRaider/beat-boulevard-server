import {IUserModel} from "@interfaces/models/user.model";

export interface IGetUserByEmailArgs {
  readonly email: string;
}

export interface IGetUserByEmailResult {
  readonly user: IUserModel;
}
