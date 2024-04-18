import {ITrackModel} from "@interfaces/models/track.model";

export interface ICreateTrackArgs {
  readonly title: string;
  readonly file: string;
  readonly album?: string;
}

export interface ICreateTrackResult {
  readonly track: ITrackModel;
}
