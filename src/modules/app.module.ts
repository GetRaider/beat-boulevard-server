import {MongooseModule} from "@nestjs/mongoose";
import {ConfigModule} from "@nestjs/config";
import {Module} from "@nestjs/common";

import {UserModule} from "@modules/user/user.module";
import {processEnv} from "../helpers/processEnv.helper";
import {RoleModule} from "@modules/role/role.module";
import {AuthModule} from "@modules/auth/auth.module";

const {DB_BASE_URL, DB_CLUSTER_URL, DB_LOGIN, DB_PASSWORD} = processEnv;

const encodedUsername = encodeURIComponent(`${DB_LOGIN}`);
const encodedPassword = encodeURIComponent(`${DB_PASSWORD}`);

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    MongooseModule.forRoot(
      `${DB_BASE_URL}${encodedUsername}:${encodedPassword}${DB_CLUSTER_URL}`,
    ),
    AuthModule,
    UserModule,
    RoleModule,
  ],
})
export class AppModule {}
