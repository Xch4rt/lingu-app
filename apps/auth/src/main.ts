import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { CustomExceptionFilter } from 'libs/common/custom-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {rateLimit} from 'express-rate-limit';
import * as helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);

  app.useGlobalFilters(new CustomExceptionFilter());

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const config = new DocumentBuilder()
    .setTitle('Auth API')
    .setDescription('Auth service for Lingu App')
    .setVersion('1.0') 
    .build();

  const document = SwaggerModule.createDocument(app, config);
  
  SwaggerModule.setup('api', app, document);


  const port = process.env.PORT || 3003;

  app.enableCors();

  app.use(
    rateLimit ({
      windowMs: 15 * 60 * 1000,
      max: 100,
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
  );



  await app.listen(port);
}
bootstrap();
