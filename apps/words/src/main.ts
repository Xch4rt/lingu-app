import { NestFactory } from '@nestjs/core';
import { WordsModule } from './words.module';

async function bootstrap() {
  const app = await NestFactory.create(WordsModule);
  await app.listen(3002);
}
bootstrap();
