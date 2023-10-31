import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateWordDto {
    @ApiProperty({
        description: 'Word'
    })
    @IsNotEmpty()
    @IsString()
    word: string;
    
    @ApiProperty({
        description: 'The word meaning'
    })
    @IsNotEmpty()
    @IsString()
    meaning: string;
    
    @ApiProperty({
        description: 'The user uid that register the word'
    })
    @IsNotEmpty()
    @IsString()
    uid: string;


}