import {IsOptional, IsString} from "class-validator";
import {ITrackModel} from "@interfaces/models/track.model";

export class TrackModel implements ITrackModel {
  @IsString()
  readonly id: string;

  @IsString()
  readonly title: string;

  @IsString()
  readonly file: string;

  @IsString()
  @IsOptional()
  readonly album?: string;
}
