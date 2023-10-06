import {Injectable, Logger} from "@nestjs/common";
import {FilterQuery, Model} from "mongoose";
import {randomUUID} from "crypto";
import {plainToInstance} from "class-transformer";
import {InjectModel} from "@nestjs/mongoose";

import {
  IUserEntity,
  UserDocument,
  UserEntity,
} from "@modules/user/schemas/user.schema";
import {UserModel} from "@modules/user/models/user.model";
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
import {
  GetUserByLoginRequestDto,
  GetUserByLoginResponseDto,
} from "@modules/user/dto/get-user-by-login.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserEntity.name)
    private readonly userModel: Model<UserDocument>,
    private readonly logger: Logger,
  ) {}

  async create(dto: CreateUserRequestDto): Promise<CreateUserResponseDto> {
    const {login, password, name, age} = dto;
    const newDocument = new this.userModel<IUserEntity>({
      _id: randomUUID(),
      login,
      password,
      name,
      age,
    });
    const savedDocument = await newDocument.save();
    this.logger.warn(`Following user has been saved: ${savedDocument}`);
    return {
      user: plainToInstance(UserModel, savedDocument.toJSON<IUserModel>()),
    };
  }

  async getByQuery(
    query: GetUsersRequestDto = {},
  ): Promise<GetUsersResponseDto> {
    const {id: idArr, login: loginArr, name: nameArr, age: ageArr} = query;

    const filterQuery: FilterQuery<IUserEntity> = {
      ...(idArr ? {_id: {$in: idArr}} : {}),
      ...(loginArr ? {login: {$in: loginArr}} : {}),
      ...(nameArr ? {name: {$in: nameArr}} : {}),
      ...(ageArr ? {age: {$in: ageArr}} : {}),
    };

    const foundDocuments = await this.userModel.find(filterQuery);

    return {
      users: foundDocuments.map(foundDocument =>
        plainToInstance(UserModel, foundDocument.toJSON<IUserModel>()),
      ),
    };
  }

  async getOneByLogin(
    dto: GetUserByLoginRequestDto,
  ): Promise<GetUserByLoginResponseDto> {
    const {login} = dto;
    const foundDocument = await this.userModel.findOne({login});
    return {
      user: plainToInstance(UserModel, foundDocument?.toJSON<IUserModel>()),
    };
  }

  async updateById(
    id: string,
    dto: UpdateUserRequestDto,
  ): Promise<UpdateUserResponseDto> {
    const updatedUser = await this.userModel.findByIdAndUpdate(id, dto, {
      new: true,
    });

    return {
      user: plainToInstance(UserModel, updatedUser.toJSON<IUserModel>()),
    };
  }

  async deleteById(id: string): Promise<void> {
    await this.userModel.findByIdAndDelete(id);
  }

  async deleteAll(): Promise<void> {
    await this.userModel.deleteMany({login: {$gte: "@gmail"}});
  }
}
