import {Logger, Module} from "@nestjs/common";
import {UserController} from "@modules/user/user.controller";
import {UserService} from "@modules/user/user.service";
import {MongooseModule} from "@nestjs/mongoose";
import {UserEntity, UserSchema} from "@modules/user/schemas/user.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{name: UserEntity.name, schema: UserSchema}]),
  ],
  controllers: [UserController],
  providers: [UserService, Logger],
})
export class UserModule {}
