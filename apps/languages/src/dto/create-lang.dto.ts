import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, isNotEmpty } from "class-validator";

export class CreateLangDto {
    @ApiProperty({
        description: 'Name of the language'
    })
    @IsNotEmpty()
    @IsString()
    name: string;
    @ApiProperty({
        description: 'Code of the Lang'
    })
    @IsNotEmpty()
    @IsString()
    code: string
}