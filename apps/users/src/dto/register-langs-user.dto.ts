import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, Length } from "class-validator";

export class RegisterLangsByUser {
    @ApiProperty({
        description: "The user uid"
    })
    @IsString()
    @IsNotEmpty()
    uid: string;

    @ApiProperty({
        description: "Array for langs preferences given by user"
    })
    @IsString({
        each: true
    })
    @IsNotEmpty()
    langs: string[];
}