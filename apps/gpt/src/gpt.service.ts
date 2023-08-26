import { Injectable } from '@nestjs/common';

@Injectable()
export class GptService {
  getHello(): string {
    return 'Hello World from GPT!';
  }
}
