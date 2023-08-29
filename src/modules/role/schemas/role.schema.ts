import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from "mongoose";
import {v4 as uuidv4} from "uuid";

export type RoleDocument = IRoleEntity & Document;

export interface IRoleEntity {
  readonly _id: string;
  readonly value: string;
  readonly description?: string;
}

@Schema({
  collection: "roles",
  autoCreate: true,
  versionKey: false,
  strict: false,
  timestamps: {createdAt: true, updatedAt: true},
})
export class RoleEntity implements IRoleEntity {
  @Prop({
    type: String,
    required: true,
    default: () => uuidv4(),
  })
  readonly _id: string;

  @Prop({type: String})
  readonly value: string;

  @Prop({type: String, required: false})
  readonly description?: string;
}

export const RoleSchema = SchemaFactory.createForClass(RoleEntity);
