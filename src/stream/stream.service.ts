import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommonService } from 'src/common/common.service';
import { Request } from 'express';
import { Readable } from 'stream';
import { randomUUID } from 'crypto';

@Injectable()
export class StreamService {

  constructor(
    private readonly commonService: CommonService
  ) { }

  async create(req: Request, uid?: string) {
    try {
      if (!uid) uid = randomUUID();
      const response = await this.commonService.setAStream(req as Readable, uid);
      if (!response.status) {
        throw new BadRequestException(response);
      }
      return { ...response, data: { uid } };
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      console.log(error);
      throw new InternalServerErrorException({
        message: "Internal Error Happend!",
        status: false
      });
    }
  }

}
