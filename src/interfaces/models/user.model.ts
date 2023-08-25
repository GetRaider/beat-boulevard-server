export interface IUserModel {
  readonly id: string;
  readonly email: string;
  readonly password: string;
  readonly name?: string;
  readonly age?: number;
}
