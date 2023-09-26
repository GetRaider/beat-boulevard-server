import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import {UserService} from "@modules/user/user.service";
import bcryptjs from "bcryptjs";
import {JwtService} from "@nestjs/jwt";
import {
  GetTokenRequestDto,
  GetTokenResponseDto,
} from "@modules/auth/dto/get-token.dto";
import {
  ValidateUserRequestDto,
  ValidateUserResponseDto,
} from "@modules/auth/dto/validate-user.dto";
import {
  GenerateTokenRequestDto,
  GenerateTokenResponseDto,
} from "@modules/auth/dto/generate-token.dto";
import {
  RegistrationRequestDto,
  RegistrationResponseDto,
} from "@modules/auth/dto/registration.dto";
import {plainToInstance} from "class-transformer";
import {UserModel} from "@modules/user/models/user.model";
import {IUserModel} from "@interfaces/models/user.model";
import {LoginRequestDto, LoginResponseDto} from "@modules/auth/dto/login.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async registration(
    dto: RegistrationRequestDto,
  ): Promise<RegistrationResponseDto> {
    const {email, password} = dto;
    const foundDocument = await this.userService.getOneByEmail({email});
    if (foundDocument) {
      throw new HttpException(
        `User with ${email} email already exist`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const encryptedPassword = await bcryptjs.hash(password, 5);
    const {user} = await this.userService.create({
      ...dto,
      password: encryptedPassword,
    });
    return this.generateToken(user);
  }

  async login(dto: LoginRequestDto): Promise<LoginResponseDto> {
    return this.validateUser(dto);
  }

  async getToken(dto: GetTokenRequestDto): Promise<GetTokenResponseDto> {
    return (await this.validateUser(dto)) && this.generateToken(dto);
  }

  private async generateToken(
    dto: GenerateTokenRequestDto,
  ): Promise<GenerateTokenResponseDto> {
    const {id, email} = dto;
    return {
      token: this.jwtService.sign({email, id}),
    };
  }
  private async validateUser(
    dto: ValidateUserRequestDto,
  ): Promise<ValidateUserResponseDto> {
    const {email, password} = dto;
    const foundDocument = await this.userService.getOneByEmail({email});
    const passwordEquals = await bcryptjs.compare(
      password,
      foundDocument.password,
    );
    if (!foundDocument || !passwordEquals) {
      throw new UnauthorizedException({message: "Incorrect email or password"});
    }
    return {
      user: plainToInstance(UserModel, foundDocument.toJSON<IUserModel>()),
    };
  }
}
