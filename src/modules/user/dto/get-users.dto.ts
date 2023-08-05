import {
  IsEmail,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { UserModel } from "@modules/user/models/user.model";
import {
  IGetUsersArgs,
  IGetUsersResult,
} from "@interfaces/dto/users/get-users.dto";
import {IUserModel} from "@interfaces/models/user.model";

export class GetUsersRequestDto implements IGetUsersArgs {
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

export class GetUsersResponseDto implements IGetUsersResult {
  @IsObject()
  @Type(() => UserModel)
  @ValidateNested()
  readonly users: Array<IUserModel>;
}
