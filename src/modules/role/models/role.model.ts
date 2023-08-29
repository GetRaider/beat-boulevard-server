import {IsOptional, IsString} from "class-validator";
import {IRoleModel} from "@interfaces/models/role.model";

export class RoleModel implements IRoleModel {
  @IsString()
  readonly id: string;

  @IsString()
  readonly value: string;

  @IsString()
  @IsOptional()
  readonly description?: string;
}
