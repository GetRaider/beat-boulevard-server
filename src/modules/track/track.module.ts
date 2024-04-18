import {Logger, Module} from '@nestjs/common';
import { TrackController } from './track.controller';
import {TrackService} from "./track.service";

@Module({
  controllers: [TrackController],
  providers: [TrackService, Logger],
})
export class TrackModule {}
