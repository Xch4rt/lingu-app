import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'libs/database/prisma/database.service';

@Injectable()
export class UsersService {
  constructor (private readonly dbService : DatabaseService) {}
  getHello(): string {
    return 'Hello World from Users Service!';
  }
}
