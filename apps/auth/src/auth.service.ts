import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from '../../../libs/database/prisma/database.service';
import { RegisterUserAuthDto } from './dto/register-user.auth.dto';
import * as argon2 from 'argon2';
import { CustomException } from '../../../libs/common/custom-exception';
import { LoginAuthDto } from './dto/login-user.auth.dto';

@Injectable()
export class AuthService {
  constructor (private readonly dbService : DatabaseService) {}
  
  private readonly logger = new Logger(AuthService.name);

  async registerUser (registerUserDto : RegisterUserAuthDto) {
    const { username, email, password } = registerUserDto;

    const userExists = await this.dbService.user.findUnique({
      where: {
        username,
        isDeleted: false,
      },
    });

    if (userExists) {
      this.logger.error('User already exists');
      throw new CustomException('User already exists', 400);
    }

    const hashedPwd = await argon2.hash(password);

    const user = await this.dbService.user.create({
      data: {
        username,
        email,
        password: hashedPwd,
      },
    });

    this.logger.log('User created successfully');

    return {
      status: 'success',
      message: 'User created successfully',
      data: {
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
      },
    }
  }

  async loginUser (loginUserDto : LoginAuthDto) {
    const { username, password } = loginUserDto;

    const user = await this.validateUser(username, password);

    return {
      status: 'success',
      message: 'User logged in successfully',
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    }
  }

  private async validateUser (username : string, password : string) {
    const user = await this.dbService.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      this.logger.error('User not found');
      throw new CustomException('User not found', 404);
    }

    const isPasswordValid = await argon2.verify(user.password, password);

    if (!isPasswordValid) {
      this.logger.error('Invalid credentials');
      throw new CustomException('Invalid credentials', 400);
    }

    return user;
  }

}
