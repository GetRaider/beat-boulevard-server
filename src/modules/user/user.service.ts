import {Injectable, Logger} from "@nestjs/common";

import {
  IUserEntity,
  UserDocument,
  UserEntity,
} from "@modules/user/schemas/user.schema";
import {FilterQuery, Model} from "mongoose";
import {randomUUID} from "crypto";
import {plainToInstance} from "class-transformer";
import {UserModel} from "@modules/user/models/user.model";
import {InjectModel} from "@nestjs/mongoose";
import {IUserModel} from "@interfaces/models/user.model";
import {
  GetUsersRequestDto,
  GetUsersResponseDto,
} from "@modules/user/dto/get-users.dto";
import {
  CreateUserRequestDto,
  CreateUserResponseDto,
} from "@modules/user/dto/create-user.dto";
import {
  UpdateUserRequestDto,
  UpdateUserResponseDto,
} from "@modules/user/dto/update-user.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserEntity.name)
    private readonly userModel: Model<UserDocument>,
    private readonly logger: Logger,
  ) {}

  async create(dto: CreateUserRequestDto): Promise<CreateUserResponseDto> {
    const {email, password, name, age} = dto;
    const newUser: UserDocument = new this.userModel<IUserEntity>({
      _id: randomUUID(),
      email,
      password,
      name,
      age,
    });
    const savedUser = await newUser.save();
    this.logger.warn(`Following user has been saved: ${savedUser}`);
    return {user: plainToInstance(UserModel, savedUser.toJSON<IUserModel>())};
  }

  async getByQuery(query: GetUsersRequestDto): Promise<GetUsersResponseDto> {
    const {
      id: idArr,
      email: emailArr,
      name: nameArr,
      age: ageArr,
    } = query || {};

    const filterQuery: FilterQuery<IUserEntity> = {
      ...(idArr ? {_id: {$in: idArr}} : {}),
      ...(emailArr ? {email: {$in: emailArr}} : {}),
      ...(nameArr ? {name: {$in: nameArr}} : {}),
      ...(ageArr ? {age: {$in: ageArr}} : {}),
    };

    const foundUsers = await this.userModel.find(filterQuery);

    return {
      users: foundUsers.map(foundUser =>
        plainToInstance(UserModel, foundUser.toJSON<IUserModel>()),
      ),
    };
  }

  async updateById(
    id: string,
    dto: UpdateUserRequestDto,
  ): Promise<UpdateUserResponseDto> {
    const updatedUser = await this.userModel.findByIdAndUpdate(id, dto, {
      new: true,
    });

    return {user: plainToInstance(UserModel, updatedUser.toJSON<IUserModel>())};
  }

  async deleteById(id: string): Promise<void> {
    await this.userModel.findByIdAndDelete(id);
  }

  async deleteAll(): Promise<void> {
    await this.userModel.deleteMany({email: {$gte: "@gmail"}});
  }
}
