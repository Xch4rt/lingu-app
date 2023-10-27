import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length, min } from "class-validator";

export class LoginAuthDto {
    @ApiProperty({
        description: 'The email of the user',
    })
    @IsNotEmpty()
    @IsString()
    email: string;

    @ApiProperty({
        description: 'The password of the user',
    })
    @IsNotEmpty()
    @IsString()
    password: string;
}