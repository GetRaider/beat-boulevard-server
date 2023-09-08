import {
  IsArray,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import {Transform, Type} from "class-transformer";

import {ISignUpArgs, ISignUpResult} from "@interfaces/dto/auth/sign-up.dto";

export class SignUpRequestDto implements ISignUpArgs {
  @IsString()
  email: string;
  @IsString()
  password: string;
}

export class SignUpResponseDto implements ISignUpResult {}
