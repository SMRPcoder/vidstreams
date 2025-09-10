import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { EncodeService } from './encode.service';
import { Request } from 'express';
import { ApiOperation } from '@nestjs/swagger';

@Controller('encode')
export class EncodeController {
  constructor(private readonly encodeService: EncodeService) {}

  @ApiOperation({summary:"it is  internal endpoint it receives stream to encode and save, if not via internal it gives an error."})
  @Post()
  create(@Req() req:Request) {
    return this.encodeService.create(req);
  }

}
