import { IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    name:string
    surname:string
    login:string
    @MinLength(5,{message:"Пароль должен содержать минимум 5 символов"})
    password:string
}
