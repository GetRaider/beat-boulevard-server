import { Module } from "@nestjs/common";
import { UserController } from "@modules/users/user.controller";
import { UserService } from "@modules/users/user.service";
import { MongooseModule } from "@nestjs/mongoose";
import { UserEntity, UserSchema } from "@modules/users/schemas/user.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserEntity.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
