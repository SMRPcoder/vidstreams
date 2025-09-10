import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommonService } from 'src/common/common.service';
import { Request } from 'express';
import { randomUUID } from 'crypto';

@Injectable()
export class EncodeService {

  constructor(
    private readonly commonService: CommonService
  ) { }

  async create(req: Request) {
    try {
      let uid: string = req.query.uid as string;
      if (!uid) uid = randomUUID();
      const response = await this.commonService.encodeAndSave(req, uid);
      if (!response.status) {
        throw new BadRequestException(response);
      }
      return response
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      console.error(error);
      throw new InternalServerErrorException({
        message: "Internal Error Happend!",
        status: false
      });
    }
  }


}
