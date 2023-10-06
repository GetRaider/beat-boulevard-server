export interface IUserModel {
  readonly id: string;
  readonly login: string;
  readonly password: string;
  readonly name?: string;
  readonly age?: number;
}
