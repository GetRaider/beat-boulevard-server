import {IsArray, IsObject, IsOptional, ValidateNested} from "class-validator";
import {Transform, Type} from "class-transformer";

import {propertyUtils} from "@utils/property.utils";
import {
  IGetRolesArgs,
  IGetRolesResult,
} from "@interfaces/dto/role/get-roles.dto";
import {RoleModel} from "@modules/role/models/role.model";
import {IRoleModel} from "@interfaces/models/role.model";

export class GetRolesRequestDto implements IGetRolesArgs {
  @Transform(propertyUtils.transformValueToArray)
  @IsOptional()
  @IsArray()
  readonly id?: Array<string>;

  @Transform(propertyUtils.transformValueToArray)
  @IsOptional()
  @IsArray()
  readonly value: Array<string>;

  @Transform(propertyUtils.transformValueToArray)
  @IsOptional()
  @IsArray()
  readonly description?: Array<string>;
}

export class GetRolesResponseDto implements IGetRolesResult {
  @IsObject()
  @Type(() => RoleModel)
  @ValidateNested()
  readonly roles: Array<IRoleModel>;
}
