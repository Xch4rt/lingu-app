import { NestFactory } from '@nestjs/core';
import { GptModule } from './gpt.module';

async function bootstrap() {
  const app = await NestFactory.create(GptModule);
  await app.listen(3004);
}
bootstrap();
