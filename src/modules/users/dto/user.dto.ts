import {
  IsEmail,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";

import { ICreateUserArgs, ICreateUserResult } from "@interfaces/dto/user.dto";
import { IUserModel } from "@interfaces/models/users.model";
import { UserModel } from "@modules/users/models/user.model";

export class CreateUserRequestDto implements ICreateUserArgs {
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly temporaryPassword: string;

  @IsString()
  @IsOptional()
  readonly name?: string;

  @IsString()
  @IsOptional()
  readonly age?: number;
}

export class CreateUserResponseDto implements ICreateUserResult {
  @IsObject()
  @Type(() => UserModel)
  @ValidateNested()
  readonly user: IUserModel;
}
