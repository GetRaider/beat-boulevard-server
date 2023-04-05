import { Controller, Get, Post } from "@nestjs/common";

@Controller("/users")
export class UserController {
  @Post()
  async createUser() {}

  @Get()
  async getAllUsers() {
    return "WORK";
  }

  async updateUser() {}

  async deleteUser() {}
}
