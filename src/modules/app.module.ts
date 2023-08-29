import {MongooseModule} from "@nestjs/mongoose";
import {ConfigModule} from "@nestjs/config";
import {Module} from "@nestjs/common";

import {UserModule} from "@modules/user/user.module";
import {processEnv} from "../helpers/processEnv.helper";
import {RoleModule} from "@modules/role/role.module";

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
    RoleModule,
  ],
})
export class AppModule {}
