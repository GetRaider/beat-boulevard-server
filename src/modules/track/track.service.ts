import {Injectable, Logger} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {randomUUID} from "crypto";
import {plainToInstance} from "class-transformer";

import {ITrackEntity, TrackDocument, TrackEntity} from "@modules/track/schemas/track.schema";
import {TrackModel} from "@modules/track/models/track.model";
import {ITrackModel} from "@interfaces/models/track.model";
import {CreateTrackRequestDto, CreateTrackResponseDto} from "@modules/track/dto/create-track.dto";

@Injectable()
export class TrackService {
  constructor(
    @InjectModel(TrackEntity.name)
    private readonly trackModel: Model<TrackDocument>,
    private readonly logger: Logger,
  ) {}

  async upload(dto: CreateTrackRequestDto): Promise<CreateTrackResponseDto> {
    const {title, file, album} = dto;
    const newRole = new this.trackModel<ITrackEntity>({
      _id: randomUUID(),
      title,
      file,
      album
    });

    const savedRole = await newRole.save();
    this.logger.warn(`Following photo has been saved: ${savedRole}`);
    return {track: plainToInstance(TrackModel, savedRole.toJSON<ITrackModel>())};
  }
}
