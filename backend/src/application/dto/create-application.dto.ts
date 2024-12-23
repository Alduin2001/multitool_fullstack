import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, Matches } from "class-validator";

export class CreateApplicationDto {
    @ApiProperty({type:'string'})
    @IsString()
    name:string
    @ApiProperty({type:'string'})
    @Matches(/^\d/,{message:"Версия должна начинаться с числа"})
    version:string
    @ApiProperty({type:Number})
    @IsNumber()
    osType:number
    @ApiProperty({type:'string',format:'binary'})
    file:any
}
