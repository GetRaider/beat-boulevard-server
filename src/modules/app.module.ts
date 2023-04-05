import { Module } from "@nestjs/common";
import { UserModule } from "@modules/users/user.module";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";
import { TrackModule } from "@modules/track/track.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DBLOGIN}:${process.env.DBPASSWORD}@main-cluster.ngd83az.mongodb.net/?retryWrites=true&w=majority`,
    ),
    UserModule,
    TrackModule,
  ],
})
export class AppModule {}
