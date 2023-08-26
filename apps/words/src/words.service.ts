import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'libs/database/prisma/database.service';


@Injectable()
export class WordsService {
  constructor (private readonly dbService : DatabaseService) {}
  getHello(): string {
    return 'Hello World from Words!';
  }
}
