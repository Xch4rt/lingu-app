import { NestFactory } from '@nestjs/core';
import { LanguagesModule } from './languages.module';

async function bootstrap() {
  const app = await NestFactory.create(LanguagesModule);
  await app.listen(3000);
}
bootstrap();
