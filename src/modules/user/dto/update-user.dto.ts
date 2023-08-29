import {
  IsEmail,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import {Type} from "class-transformer";

import {UserModel} from "@modules/user/models/user.model";
import {IUserModel} from "@interfaces/models/user.model";
import {
  IUpdateUserArgs,
  IUpdateUserResult,
} from "@interfaces/dto/user/update-user.dto";

export class UpdateUserRequestDto implements IUpdateUserArgs {
  @IsEmail()
  readonly email: string;

  @IsString()
  @IsOptional()
  readonly name?: string;

  @IsNumber()
  @IsOptional()
  readonly age?: number;
}

export class UpdateUserResponseDto implements IUpdateUserResult {
  @IsObject()
  @Type(() => UserModel)
  @ValidateNested()
  readonly user: IUserModel;
}
