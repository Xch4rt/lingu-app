import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';
import { CustomExceptionFilter } from 'libs/common/exceptions/custom-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe, Logger } from '@nestjs/common';
import {rateLimit} from 'express-rate-limit';
import * as dotenv from 'dotenv';
import * as helmet from 'helmet';


async function bootstrap() {
  dotenv.config();

  const logger = new Logger('bootstrap');

  const app = await NestFactory.create(UsersModule);

  app.useGlobalFilters(new CustomExceptionFilter());

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  
  const config = new DocumentBuilder()
        .setTitle('Users API')
        .setDescription('User service for Lingu App')
        .setVersion('1.0')
        .build();
  
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);
  
  const port = process.env.AUTH_PORT || 3001;

  app.enableCors();

  app.use(
    rateLimit ({
      windowMs: 15 * 60 * 1000,
      max: 100
    }),

    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:', 'validator.swagger.io'],
        fontSrc: ["'self'", 'data:'],
      },
    }),
  )
  await app.listen(port);

  logger.log(`Application listening on port ${port}`)
}
bootstrap();
