import { Controller, Get } from '@nestjs/common';
import { LanguagesService } from './languages.service';

@Controller()
export class LanguagesController {
  constructor(private readonly languagesService: LanguagesService) {}

  @Get()
  getHello(): string {
    return this.languagesService.getHello();
  }
}
