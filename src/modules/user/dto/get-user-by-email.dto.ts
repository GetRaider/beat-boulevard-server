import {
  IsArray,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import {Transform, Type} from "class-transformer";

import {UserModel} from "@modules/user/models/user.model";
import {IUserModel} from "@interfaces/models/user.model";
import {propertyUtils} from "@utils/property.utils";
import {
  IGetUsersArgs,
  IGetUsersResult,
} from "@interfaces/dto/user/get-users.dto";
import {
  IGetUserByEmailArgs,
  IGetUserByEmailResult,
} from "@interfaces/dto/user/get-user-by-email.dto";

export class GetUserByEmailRequestDto implements IGetUserByEmailArgs {
  @IsString()
  readonly email: string;
}

export class GetUserByEmailResponseDto implements IGetUserByEmailResult {
  @IsObject()
  @Type(() => UserModel)
  @ValidateNested()
  readonly user: IUserModel;
}
