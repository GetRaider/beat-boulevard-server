import {IsEmail, IsString} from "class-validator";
import {
  IGenerateTokenArgs,
  IGenerateTokenResult,
} from "@interfaces/dto/auth/generate-token.dto";

export class GenerateTokenRequestDto implements IGenerateTokenArgs {
  @IsString()
  readonly id: string;
  @IsEmail()
  readonly email: string;
}

export class GenerateTokenResponseDto implements IGenerateTokenResult {
  @IsString()
  readonly token: string;
}
