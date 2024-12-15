import { IsString, Matches } from "class-validator";

export class CreateOperationSyDto {
    @IsString()
    name:string
    @Matches(/^\d/,{message:"Версия должна начинаться с числа"})
    version:string
}
