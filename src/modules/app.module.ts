import { Module } from "@nestjs/common";
import { UserModule } from "@modules/user/user.module";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
    }),
    MongooseModule.forRoot(
      "mongodb+srv://andrewpolovec:andrewpolovec@main-cluster.ngd83az.mongodb.net/?retryWrites=true&w=majority",
    ),
    UserModule,
  ],
})
export class AppModule {}
