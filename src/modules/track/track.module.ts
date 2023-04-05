import { Module } from "@nestjs/common";
import { TrackService } from "@modules/track/track.service";
import { TrackController } from "@modules/track/track.controller";

@Module({
  providers: [TrackService],
  controllers: [TrackController],
})
export class TrackModule {}
