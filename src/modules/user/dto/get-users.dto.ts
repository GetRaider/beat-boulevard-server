import {IsArray, IsObject, IsOptional, ValidateNested} from "class-validator";
import {Transform, Type} from "class-transformer";

import {UserModel} from "@modules/user/models/user.model";
import {IUserModel} from "@interfaces/models/user.model";
import {propertyUtils} from "@utils/property.utils";
import {
  IGetUsersArgs,
  IGetUsersResult,
} from "@interfaces/dto/users/get-users.dto";

export class GetUsersRequestDto implements IGetUsersArgs {
  @Transform(propertyUtils.transformValueToArray)
  @IsOptional()
  @IsArray()
  readonly id?: Array<string>;

  @Transform(propertyUtils.transformValueToArray)
  @IsOptional()
  @IsArray()
  readonly email?: Array<string>;

  @Transform(propertyUtils.transformValueToArray)
  @IsOptional()
  @IsArray()
  readonly name?: Array<string>;

  @Transform(propertyUtils.transformValueToArray)
  @IsOptional()
  @IsArray()
  readonly age?: Array<number>;
}

export class GetUsersResponseDto implements IGetUsersResult {
  @IsObject()
  @Type(() => UserModel)
  @ValidateNested()
  readonly users: Array<IUserModel>;
}
