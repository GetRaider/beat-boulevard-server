import {IsObject, IsOptional, IsString, ValidateNested} from "class-validator";
import {Type} from "class-transformer";

import {ISignInArgs, ISignInResult} from "@interfaces/dto/auth/sign-in.dto";

export class SignInRequestDto implements ISignInArgs {}

export class SignInResponseDto implements ISignInResult {}
