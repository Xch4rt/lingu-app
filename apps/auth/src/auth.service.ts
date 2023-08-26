import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'libs/database/prisma/database.service';

@Injectable()
export class AuthService {
  constructor (private readonly dbService : DatabaseService) {}
  getHello(): string {
    return 'Hello World from auth service';
  }
}
