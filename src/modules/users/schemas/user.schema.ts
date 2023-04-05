import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = IUserEntity & Document;

export interface IUserEntity {
  readonly _id: string;
  readonly email: string;
  readonly name?: string;
  readonly age?: number;
  readonly isMarried?: boolean;
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
  @Prop({ type: String, required: true })
  readonly _id: string;

  @Prop({ type: String, required: true })
  readonly email: string;

  @Prop({ type: String })
  readonly name?: string;

  @Prop(Number)
  readonly age?: number;

  @Prop(Boolean)
  readonly isMarried?: boolean;
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);
