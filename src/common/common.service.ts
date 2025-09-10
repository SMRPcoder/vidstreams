import { Injectable } from '@nestjs/common';
import { Readable } from 'stream';
import { FileSavingService } from './providers/fileSave.service';

@Injectable()
export class CommonService {

  constructor(
    private readonly fileSavingService: FileSavingService
  ) { }

  async setAStream(chunk: Readable, uid: string) {
    return await this.fileSavingService.setAStream(chunk, uid);
  }

  async encodeAndSave(chunk: Readable, uid: string) {
    return await this.fileSavingService.encodeAndSave(chunk, uid);
  }

}
