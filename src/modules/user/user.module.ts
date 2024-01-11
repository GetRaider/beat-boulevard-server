import {forwardRef, Logger, Module} from "@nestjs/common";
import {UserController} from "@modules/user/user.controller";
import {UserService} from "@modules/user/user.service";
import {MongooseModule} from "@nestjs/mongoose";
import {UserEntity, UserSchema} from "@modules/user/schemas/user.schema";
import {AuthModule} from "@modules/auth/auth.module";
import {RoleService} from "@modules/role/role.service";
import {RoleModule} from "@modules/role/role.module";
import {RoleEntity, RoleSchema} from "@modules/role/schemas/role.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: UserEntity.name, schema: UserSchema},
      {name: RoleEntity.name, schema: RoleSchema},
    ]),
    forwardRef(() => AuthModule),
  ],
  controllers: [UserController],
  providers: [UserService, Logger, RoleService],
  exports: [UserService],
})
export class UserModule {}
