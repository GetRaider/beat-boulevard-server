import {Body, Controller, Post} from "@nestjs/common";
import {AuthService} from "@modules/auth/auth.service";
import {SignUpRequestDto} from "@modules/auth/dto/sign-up.dto";
import {
  SignInRequestDto,
  SignInResponseDto,
} from "@modules/auth/dto/sign-in.dto";
import {CreateUserRequestDto} from "@modules/user/dto/create-user.dto";
import {UserModel} from "@modules/user/models/user.model";

@Controller("/auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/registration")
  async registration(@Body() dto: CreateUserRequestDto): Promise<unknown> {
    return this.authService.registration(dto);
  }

  @Post("/login")
  async login(@Body() dto: CreateUserRequestDto): Promise<unknown> {
    return this.authService.login(dto);
  }

  @Post("/token")
  async getToken(@Body() dto: UserModel): Promise<unknown> {
    return this.authService.getToken(dto);
  }
}
