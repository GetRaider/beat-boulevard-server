import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from "@nestjs/common";
import {Observable} from "rxjs";
import {Reflector} from "@nestjs/core";
import {Role} from "@interfaces/enums/roles.enums";
import {IRoleModel} from "@interfaces/models/role.model";

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly logger: Logger,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<Array<Role>>("roles", context.getHandler);
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    // this.logger.warn(`Role: ${roles}, User-role: ${request.user.roles}`);
    return this.matchRoles(roles, request.user.roles);
  }

  private matchRoles(
    roles: Array<Role>,
    userRoles: Array<IRoleModel>,
  ): boolean {
    // return userRoles.some(userRole => {
    //   return roles[0] === userRole.value;
    // });
    return roles.some(role =>
      userRoles.some(userRole => {
        return role === userRole.value;
      }),
    );
  }
}
