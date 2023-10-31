import { Injectable } from '@nestjs/common';

@Injectable()
export class LanguagesService {
  getHello(): string {
    return 'Hello World!';
  }
}
