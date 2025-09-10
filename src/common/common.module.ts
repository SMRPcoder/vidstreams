import { Global, Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { FileSavingService } from './providers/fileSave.service';
// import { CommonController } from './common.controller';

@Global()
@Module({
  // controllers: [CommonController],
  providers: [CommonService,FileSavingService],
  exports:[CommonService]
})
export class CommonModule {}
