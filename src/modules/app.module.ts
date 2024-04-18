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
import {S3OwnModule} from "@modules/s3/s3.module";
import {configHelper} from "../helpers/config.helper";

const {IS_LOCALE} = processEnv;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    configHelper.getMongooseModule(IS_LOCALE),
    S3Module.forRoot({
      config: {
        credentials: {
          accessKeyId: "minio",
          secretAccessKey: "password",
        },
        region: "us-east-1",
        endpoint: "https://60f2-77-255-144-23.ngrok-free.app",
        forcePathStyle: true,
      },
    }),
    AuthModule,
    UserModule,
    RoleModule,
    S3OwnModule,
  ],
  providers: [{provide: APP_FILTER, useClass: HttpExceptionFilter}, Logger],
})
export class AppModule {}
