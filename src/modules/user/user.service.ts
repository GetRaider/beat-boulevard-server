import {Injectable} from "@nestjs/common";
import {
  IUserEntity,
  UserDocument,
  UserEntity,
} from "@modules/user/schemas/user.schema";
import {Model} from "mongoose";
import {
  CreateUserRequestDto,
  CreateUserResponseDto,
} from "@modules/user/dto/create-user.dto";
import {randomUUID} from "crypto";
import {plainToClass} from "class-transformer";
import {UserModel} from "@modules/user/models/user.model";
import {InjectModel} from "@nestjs/mongoose";
import {
  GetUsersRequestDto,
  GetUsersResponseDto,
} from "@modules/user/dto/get-users.dto";
import {IUserModel} from "@interfaces/models/user.model";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserEntity.name)
    private readonly userModel: Model<UserDocument>,
  ) {}
  async createUser(
    createUserDto: CreateUserRequestDto,
  ): Promise<CreateUserResponseDto> {
    const {email, temporaryPassword, name, age} = createUserDto;
    const newUser: UserDocument = new this.userModel<IUserEntity>({
      _id: randomUUID(),
      email,
      temporaryPassword,
      name,
      age,
    });
    const savedUser = await newUser.save();
    return {user: plainToClass(UserModel, savedUser.toJSON<IUserModel>())};
  }

  async getAllUsers(): Promise<GetUsersResponseDto> {
    const foundUsers = await this.userModel.find({});
    return {
      users: foundUsers.map(foundUser =>
        plainToClass(UserModel, foundUser.toJSON<IUserModel>()),
      ),
    };
  }

  // async updateUser() {}
  //
  // async deleteUser() {}
}
