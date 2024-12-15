import { IsString } from "class-validator";

export class LoginUserDto{
    @IsString()
    login:string
    password:string
}