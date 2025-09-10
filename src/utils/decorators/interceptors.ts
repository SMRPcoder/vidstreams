import { Injectable, NestInterceptor, ExecutionContext, CallHandler, BadRequestException } from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";

@Injectable()
export class VideoValidationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest<Request>();

    // 1. Header check
    if (req.headers['content-type']!="application/octet-stream") {
      throw new BadRequestException('Invalid content type, only video allowed');
    }

    // 2. Peek first chunk
    req.once('data', (chunk: Buffer) => {
      if (!chunk.includes('ftyp')) {  // crude mp4 check
        req.destroy(new Error('Invalid video stream'));
      }
    });

    return next.handle();
  }
}