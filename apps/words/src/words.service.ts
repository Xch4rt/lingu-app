import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from 'libs/database/prisma/database.service';
import { CustomException } from 'libs/common/exceptions/custom-exception';


@Injectable()
export class WordsService {
  constructor (private readonly dbService : DatabaseService) {}
  getHello(): string {
    return 'Hello World from Words!';
  }
}
