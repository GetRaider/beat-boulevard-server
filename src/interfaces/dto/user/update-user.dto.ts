import {IUserModel} from "@interfaces/models/user.model";

export interface IUpdateUserArgs {
  readonly email: string;
  readonly name?: string;
  readonly age?: number;
}

export interface IUpdateUserResult {
  readonly user: IUserModel;
}
