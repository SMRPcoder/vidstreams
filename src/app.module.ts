import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { StreamModule } from './stream/stream.module';
import { EncodeModule } from './encode/encode.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { spawn } from "child_process";
import * as fs from "fs";

@Module({
  imports: [
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 10,
    }]),
    CommonModule, StreamModule, EncodeModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    },
    AppService,
  ],
})
export class AppModule implements OnModuleInit {

  onModuleInit() {
    const ffmpeg = spawn("ffmpeg", ["-version"]);

    ffmpeg.stderr.on("data", (data) => {
      console.error("FFmpeg error:", data.toString());
      throw new Error("ffmpeg not installed or cannot be accessed!")
    });
    const isUploadFolderExists=fs.existsSync("/uploads");
    if(!isUploadFolderExists){
      fs.mkdirSync("/uploads");
    }

  }

}
