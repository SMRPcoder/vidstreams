import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsUUID } from "class-validator";

export class CreateStreamDto {}

export class QueryStreamDto{
    
    @IsOptional()
    @IsUUID("4")
    @ApiProperty({type:"string",required:false})
    uid?:string;

}
