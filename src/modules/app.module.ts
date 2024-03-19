import {MongooseModule} from "@nestjs/mongoose";
import {ConfigModule} from "@nestjs/config";
import {Logger, Module} from "@nestjs/common";

import {UserModule} from "@modules/user/user.module";
import {processEnv} from "../helpers/processEnv.helper";
import {RoleModule} from "@modules/role/role.module";
import {AuthModule} from "@modules/auth/auth.module";
import {APP_FILTER} from "@nestjs/core";
import {HttpExceptionFilter} from "../helpers/httpExceptionFilter.helper";
import {S3Module} from "nestjs-s3";

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
    S3Module.forRoot({
      config: {
        credentials: {
          accessKeyId: "minio",
          secretAccessKey: "password",
        },
        region: "us-east-1",
        endpoint: "https://humble-gladly-raven.ngrok-free.app",
        forcePathStyle: true,
      },
    }),
    AuthModule,
    UserModule,
    RoleModule,
  ],
  providers: [{provide: APP_FILTER, useClass: HttpExceptionFilter}, Logger],
})
export class AppModule {}
