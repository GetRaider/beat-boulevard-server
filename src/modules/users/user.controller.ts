import { Body, Controller, Get, Injectable, Post } from "@nestjs/common";
import { UserService } from "@modules/users/user.service";
import {
  CreateUserRequestDto,
  CreateUserResponseDto,
} from "@modules/users/dto/user.dto";

@Controller("/users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(
    @Body() body: CreateUserRequestDto,
  ): Promise<CreateUserResponseDto> {
    return await this.userService.createUser(body);
  }

  @Get()
  async getAllUsers() {
    return "WORK";
  }

  async updateUser() {}

  async deleteUser() {}
}
