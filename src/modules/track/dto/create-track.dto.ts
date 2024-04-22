import {IsObject, IsOptional, IsString, ValidateNested} from "class-validator";
import {Type} from "class-transformer";

import {
  ICreateTrackArgs,
  ICreateTrackResult,
} from "@interfaces/dto/track/create-track.dto";
import {ITrackModel} from "@interfaces/models/track.model";
import {TrackModel} from "@modules/track/models/track.model";

export class CreateTrackRequestDto implements ICreateTrackArgs {
  @IsString()
  readonly title: string;

  @IsString()
  readonly file: string;

  @IsString()
  @IsOptional()
  readonly album?: string;
}

export class CreateTrackResponseDto implements ICreateTrackResult {
  @IsObject()
  @Type(() => TrackModel)
  @ValidateNested()
  readonly track: ITrackModel;
}
