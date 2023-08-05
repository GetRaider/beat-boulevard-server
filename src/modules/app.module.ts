import {Module} from "@nestjs/common";
import {UserModule} from "@modules/user/user.module";
import {MongooseModule} from "@nestjs/mongoose";
import {ConfigModule} from "@nestjs/config";
import {processEnv} from "../helpers/processEnv.helper";

const {DBLOGIN, DBPASSWORD} = processEnv;

const encodedUsername = encodeURIComponent(`${DBLOGIN}`);
const encodedPassword = encodeURIComponent(`${DBPASSWORD}`);

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    MongooseModule.forRoot(
      `mongodb+srv://${encodedUsername}:${encodedPassword}@main-cluster.ngd83az.mongodb.net/`,
    ),
    UserModule,
  ],
})
export class AppModule {}
