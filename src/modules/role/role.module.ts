import {Logger, Module} from "@nestjs/common";
import {RoleService} from "./role.service";
import {RoleController} from "./role.controller";
import {MongooseModule} from "@nestjs/mongoose";
import {RoleEntity, RoleSchema} from "@modules/role/schemas/role.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{name: RoleEntity.name, schema: RoleSchema}]),
  ],
  controllers: [RoleController],
  providers: [RoleService, Logger],
})
export class RoleModule {}