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
import {GetUserByEmailRequestDto} from "@modules/user/dto/get-user-by-email.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserEntity.name)
    private readonly userModel: Model<UserDocument>,
    private readonly logger: Logger,
  ) {}

  async create(dto: CreateUserRequestDto): Promise<CreateUserResponseDto> {
    const {email, password, name, age} = dto;
    const newDocument: UserDocument = new this.userModel<IUserEntity>({
      _id: randomUUID(),
      email,
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

    const foundDocuments = await this.userModel.find(filterQuery);

    return {
      users: foundDocuments.map(foundDocument =>
        plainToInstance(UserModel, foundDocument.toJSON<IUserModel>()),
      ),
    };
  }

  async getOneByEmail(dto: GetUserByEmailRequestDto): Promise<UserDocument> {
    const {email} = dto;
    return this.userModel.findOne({email});
    // todo add work with DTOs
    // return {
    //   user: plainToInstance(UserModel, foundDocument.toJSON<IUserModel>()),
    // };
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
    await this.userModel.deleteMany({email: {$gte: "@gmail"}});
  }
}
