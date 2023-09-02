import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, Length } from "class-validator";

export class RegisterUserDto {
    @ApiProperty({
        description: 'The first name of the user',
    })
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @ApiProperty({
        description: 'The last name of the user',
    })
    @IsNotEmpty()
    @IsString()
    lastName: string;

    @ApiProperty({
        description: 'The id of the user',
    })
    @IsNotEmpty()
    @IsNumber()
    userId: number;
}