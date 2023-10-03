import {IAuthModel} from "@interfaces/models/auth.model";

export interface IGetTokenArgs {
  readonly id: string;
  readonly email: string;
  readonly password: string;
}

export interface IGetTokenResult {
  readonly token: IAuthModel;
}
