import { IsNumber, IsString, Matches } from "class-validator";

export class CreateApplicationDto {
    @IsString()
    name:string
    @Matches(/^\d/,{message:"Версия должна начинаться с числа"})
    version:string
    @IsNumber()
    osType:number
}
