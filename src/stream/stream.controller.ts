import { Controller, HttpCode, ParseUUIDPipe, Post, Query, Req, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { StreamService } from './stream.service';
import { Request } from 'express';
import { VideoValidationInterceptor } from 'src/utils/decorators/interceptors';
import { ApiBody, ApiConsumes, ApiOperation } from '@nestjs/swagger';

@Controller('stream')
export class StreamController {
  constructor(private readonly streamService: StreamService) { }


  @ApiOperation({
    summary: 'Save a Video File as encoded with the help of Stream and FFMPEG',
    description: 'This endpoint accepts a raw video stream. The request should be sent with `Content-Type: application/octet-stream`.',
  })
  @ApiBody({
    schema: {
      type: 'string',
      format: 'binary',
      description: 'Raw video stream (MP4 or other supported video format)',
    },
  })
  @ApiConsumes('application/octet-stream')
  @UseInterceptors(VideoValidationInterceptor)
  @HttpCode(201)
  @Post()
  async saveAStream(@Req() req: Request,@Query("uid",new ParseUUIDPipe({version:"4",optional:true})) uid:string) {
    return await this.streamService.create(req,uid);
  }

}
