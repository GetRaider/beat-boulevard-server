import { Injectable } from "@nestjs/common";
import {
  IUserEntity,
  UserDocument,
  UserEntity,
} from "@modules/users/schemas/user.schema";
import { Model } from "mongoose";
import {
  CreateUserRequestDto,
  CreateUserResponseDto,
} from "@modules/users/dto/user.dto";
import { randomUUID } from "crypto";
import { plainToClass } from "class-transformer";
import { IUserModel } from "@interfaces/models/users.model";
import { UserModel } from "@modules/users/models/user.model";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserEntity.name) private userModel: Model<UserDocument>,
  ) {}
  async createUser(
    createUserDto: CreateUserRequestDto,
  ): Promise<CreateUserResponseDto> {
    const { email, temporaryPassword, name, age } = createUserDto;
    const newDoc: UserDocument = new this.userModel<IUserEntity>({
      _id: randomUUID(),
      email,
      temporaryPassword,
      name,
      age,
    });
    const storedDoc = await newDoc.save();
    console.log("STOREDDOC:", storedDoc);
    const userModel: IUserModel = plainToClass(
      UserModel,
      storedDoc.toJSON<IUserModel>(),
    );
    return { user: userModel };
  }

  // async getAllUsers() {}
  //
  // async updateUser() {}
  //
  // async deleteUser() {}
}
