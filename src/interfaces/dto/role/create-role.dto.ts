import {IRoleModel} from "@interfaces/models/role.model";

export interface ICreateRoleArgs {
  readonly value?: string;
  readonly description?: string;
}

export interface ICreateRoleResult {
  readonly role: IRoleModel;
}
