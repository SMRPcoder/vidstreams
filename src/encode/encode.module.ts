import { Module } from '@nestjs/common';
import { EncodeService } from './encode.service';
import { EncodeController } from './encode.controller';

@Module({
  controllers: [EncodeController],
  providers: [EncodeService],
})
export class EncodeModule {}
