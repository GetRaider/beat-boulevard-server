import { IUserModel } from "@interfaces/models/users.model";
import { IsOptional, IsString } from "class-validator";

export class UserModel implements IUserModel {
  @IsString()
  readonly id: string;

  @IsString()
  readonly email: string;

  @IsString()
  readonly password: string;

  @IsString()
  @IsOptional()
  readonly name?: string;

  @IsString()
  @IsOptional()
  readonly age?: number;
}
