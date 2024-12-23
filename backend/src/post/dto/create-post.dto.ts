import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
export class CreatePostDto {
    @ApiProperty({type:'string'})
    @IsString()
    header:string
    @ApiProperty({type:'string'})
    body:string
}
