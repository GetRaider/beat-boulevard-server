import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export type UserDocument = IUserEntity & Document;

export interface IUserEntity {
  readonly _id: string;
  readonly email: string;
  readonly temporaryPassword: string;
  readonly name?: string;
  readonly age?: number;
}

@Schema({
  collection: "users",
  autoCreate: true,
  versionKey: false,
  strict: false,
  timestamps: { createdAt: true, updatedAt: true },
  toJSON: {
    transform: function (doc, ret) {
      ret.id = ret._id;
      delete ret._id;
    },
  },
})
export class UserEntity implements IUserEntity {
  @Prop({
    type: String,
    default: function genUUID() {
      return uuidv4();
    },
  })
  readonly _id: string;

  @Prop({ type: String, required: true })
  readonly email: string;

  @Prop({ type: String, required: true })
  readonly temporaryPassword: string;

  @Prop({ type: String })
  readonly name?: string;

  @Prop(Number)
  readonly age?: number;
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);
