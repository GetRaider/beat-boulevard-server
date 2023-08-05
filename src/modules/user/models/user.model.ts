import { IsOptional, IsString } from "class-validator";
import {IUserModel} from "@interfaces/models/user.model";

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
