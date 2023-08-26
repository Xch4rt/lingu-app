import { Controller, Get } from '@nestjs/common';
import { WordsService } from './words.service';

@Controller()
export class WordsController {
  constructor(private readonly wordsService: WordsService) {}

  @Get()
  getHello(): string {
    return this.wordsService.getHello();
  }
}
