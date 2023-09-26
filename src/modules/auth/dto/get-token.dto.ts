import {IsString} from "class-validator";
import {
  IGetTokenArgs,
  IGetTokenResult,
} from "@interfaces/dto/auth/get-token.dto";

export class GetTokenRequestDto implements IGetTokenArgs {
  @IsString()
  readonly id: string;
  @IsString()
  readonly email: string;
  @IsString()
  readonly password: string;
}

export class GetTokenResponseDto implements IGetTokenResult {
  @IsString()
  readonly token: string;
}
