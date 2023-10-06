import {IsObject, IsOptional, IsString, ValidateNested} from "class-validator";
import {Type} from "class-transformer";

import {UserModel} from "@modules/user/models/user.model";
import {IUserModel} from "@interfaces/models/user.model";
import {
  ICreateUserArgs,
  ICreateUserResult,
} from "@interfaces/dto/user/create-user.dto";

export class CreateUserRequestDto implements ICreateUserArgs {
  @IsString()
  readonly login: string;

  @IsString()
  readonly password: string;

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
