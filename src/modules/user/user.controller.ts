import {Body, Controller, Get, Post} from "@nestjs/common";
import {UserService} from "@modules/user/user.service";
import {
  CreateUserRequestDto,
  CreateUserResponseDto,
} from "@modules/user/dto/create-user.dto";
import {GetUsersResponseDto} from "@modules/user/dto/get-users.dto";

@Controller("/users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(
    @Body() body: CreateUserRequestDto,
  ): Promise<CreateUserResponseDto> {
    return this.userService.createUser(body);
  }

  @Get()
  async getAllUsers(): Promise<GetUsersResponseDto> {
    return this.userService.getAllUsers();
  }

  // async updateUser() {}
  //
  // async deleteUser() {}
}
