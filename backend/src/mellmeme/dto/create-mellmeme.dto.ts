import { IsString } from "class-validator";

export class CreateMellmemeDto {
    @IsString()
    name:string
}
