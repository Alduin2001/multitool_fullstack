import { ApiProperty } from "@nestjs/swagger";
import { IsString, Matches } from "class-validator";

export class CreateOperationSyDto {
    @IsString()
    @ApiProperty({type:'string'})
    name:string
    @Matches(/^\d/,{message:"Версия должна начинаться с числа"})
    @ApiProperty({type:'string'})
    version:string
}
