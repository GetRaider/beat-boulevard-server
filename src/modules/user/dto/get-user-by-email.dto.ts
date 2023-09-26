import {IsString} from "class-validator";

import {IGetUserByEmailArgs} from "@interfaces/dto/user/get-user-by-email.dto";

export class GetUserByEmailRequestDto implements IGetUserByEmailArgs {
  @IsString()
  readonly email: string;
}

// todo: Add dto for this call
// export class GetUserByEmailResponseDto implements IGetUserByEmailResult {
//   @IsObject()
//   @Type(() => UserModel)
//   @ValidateNested()
//   readonly user: IUserModel;
//   readonly user: IUserModel;
// }
