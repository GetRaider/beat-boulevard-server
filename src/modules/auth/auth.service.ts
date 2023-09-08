import {
  Body,
  HttpException,
  HttpStatus,
  Injectable,
  Post,
  UnauthorizedException,
} from "@nestjs/common";
import {UserService} from "@modules/user/user.service";
import {SignUpRequestDto} from "@modules/auth/dto/sign-up.dto";
import bcryptjs from "bcryptjs";
import {
  CreateUserRequestDto,
  CreateUserResponseDto,
} from "@modules/user/dto/create-user.dto";
import {UserModel} from "@modules/user/models/user.model";
import {ICreateUserResult} from "@interfaces/dto/user/create-user.dto";
import {IUserModel} from "@interfaces/models/user.model";
import {JwtService} from "@nestjs/jwt";
import {UserModule} from "@modules/user/user.module";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async registration(dto: CreateUserRequestDto): Promise<any> {
    const {email, password} = dto;
    const foundDocument = await this.userService.getByEmail({email});
    if (foundDocument) {
      console.log(foundDocument);
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

  async getToken(user: UserModel) {
    const {email} = user;
    const foundDocument = await this.userService.getByEmail({email});
    if (foundDocument) {
      return this.generateToken(user);
    }
  }

  async login(dto: CreateUserRequestDto): Promise<unknown> {
    const user = await this.validateUser(dto);
    return user;
  }

  private async generateToken(user: UserModel) {
    const {id, email} = user;
    return {
      token: this.jwtService.sign({email, id}),
    };
  }
  private async validateUser(dto: CreateUserRequestDto) {
    const {email, password} = dto;
    const foundUser = await this.userService.getByEmail({email});
    const passwordEquals = await bcryptjs.compare(password, foundUser.password);
    if (!foundUser || !passwordEquals) {
      throw new UnauthorizedException({message: "Incorrect email or password"});
    }
    return foundUser;
  }
}
