import {forwardRef, Logger, Module} from "@nestjs/common";
import {UserController} from "@modules/user/user.controller";
import {UserService} from "@modules/user/user.service";
import {MongooseModule} from "@nestjs/mongoose";
import {UserEntity, UserSchema} from "@modules/user/schemas/user.schema";
import {AuthModule} from "@modules/auth/auth.module";

@Module({
  imports: [
    MongooseModule.forFeature([{name: UserEntity.name, schema: UserSchema}]),
    forwardRef(() => AuthModule),
  ],
  controllers: [UserController],
  providers: [UserService, Logger],
  exports: [UserService],
})
export class UserModule {}
