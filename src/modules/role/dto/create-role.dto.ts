import {IsObject, IsOptional, IsString, ValidateNested} from "class-validator";
import {Type} from "class-transformer";

import {
  ICreateRoleArgs,
  ICreateRoleResult,
} from "@interfaces/dto/role/create-role.dto";
import {RoleModel} from "@modules/role/models/role.model";
import {IRoleModel} from "@interfaces/models/role.model";

export class CreateRoleRequestDto implements ICreateRoleArgs {
  @IsString()
  readonly value?: string;

  @IsString()
  @IsOptional()
  readonly description?: string;
}

export class CreateRoleResponseDto implements ICreateRoleResult {
  @IsObject()
  @Type(() => RoleModel)
  @ValidateNested()
  readonly role: IRoleModel;
}
