import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    @ApiProperty()
    name:string
    @ApiProperty()
    surname:string
    @ApiProperty()
    login:string
    @MinLength(5,{message:"Пароль должен содержать минимум 5 символов"})
    @ApiProperty()
    password:string
}
