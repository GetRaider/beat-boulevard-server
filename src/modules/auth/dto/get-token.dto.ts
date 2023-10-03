import {IsObject, IsString, ValidateNested} from "class-validator";
import {
  IGetTokenArgs,
  IGetTokenResult,
} from "@interfaces/dto/auth/get-token.dto";
import {Type} from "class-transformer";
import {AuthModel} from "@modules/auth/models/auth.model";
import {IAuthModel} from "@interfaces/models/auth.model";

export class GetTokenRequestDto implements IGetTokenArgs {
  @IsString()
  readonly id: string;
  @IsString()
  readonly email: string;
  @IsString()
  readonly password: string;
}

export class GetTokenResponseDto implements IGetTokenResult {
  @IsObject()
  @Type(() => AuthModel)
  @ValidateNested()
  readonly token: IAuthModel;
}
