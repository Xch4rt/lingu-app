import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length, min } from "class-validator";

export class LoginAuthDto {
    @ApiProperty({
        description: 'The username of the user',
    })
    @IsNotEmpty()
    @IsString()
    username: string;

    @ApiProperty({
        description: 'The password of the user',
    })
    @IsNotEmpty()
    @IsString()
    password: string;
}