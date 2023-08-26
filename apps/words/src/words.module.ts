import { Module } from '@nestjs/common';
import { WordsController } from './words.controller';
import { WordsService } from './words.service';
import { DatabaseModule } from 'libs/database/prisma/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [WordsController],
  providers: [WordsService],
})
export class WordsModule {}
