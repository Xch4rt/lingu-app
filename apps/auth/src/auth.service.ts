import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from '../../../libs/database/prisma/database.service';
import { RegisterUserAuthDto } from './dto/register-user.auth.dto';
import * as argon2 from 'argon2';
import { CustomException } from '../../../libs/common/exceptions/custom-exception';
import { LoginAuthDto } from './dto/login-user.auth.dto';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { initializerFirebase } from './firebase.config';

@Injectable()
export class AuthService {
  constructor(private readonly dbService: DatabaseService) { }

  private readonly logger = new Logger(AuthService.name);

  private readonly firebaseAuth = initializerFirebase().firebaseAuth;

  async registerUser(registerUserDto: RegisterUserAuthDto) {
    const { username, email, password } = registerUserDto;
    try {
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

      const userCredential = await createUserWithEmailAndPassword(this.firebaseAuth, email, password);
      const userFirebase = userCredential.user;

      const user = await this.dbService.user.create({
        data: {
          id: userFirebase.uid,
          username
        },
      });

      this.logger.log('User created successfully');

      return {
        status: 'success',
        message: 'User created successfully',
        data: {
          username: user.username,
          email: userFirebase.email,
          createdAt: user.createdAt,
        },
      }
    } catch (error) {
      this.logger.error('An error has been ocurred', error);
      throw new CustomException('Error with the request', 500);
    }
  }

  async loginUser(loginUserDto: LoginAuthDto) {
    const { email, password } = loginUserDto;

    const { data, accesToken } = await this.validateUser(email, password);

    return {
      status: 'success',
      message: 'User logged in successfully',
      data: {
        id: data.user.id,
        username: data.user.username,
        email: data.userFirebase.email,
        accessToken: accesToken
      },
    }
  }

  private async validateUser(email: string, password: string) {

    try {
      const userCredential = await signInWithEmailAndPassword(this.firebaseAuth, email, password);
      const userFirebase = userCredential.user;

      if (!userFirebase) {
        this.logger.error('Invalid credentials');
        throw new CustomException('Invalid credentials', 400);
      }

      const user = await this.dbService.user.findUnique({
        where: {
          id: userFirebase.uid,
          isDeleted: false
        },
      });

      if (!user) {
        this.logger.error('User not found');
        throw new CustomException('User not found', 404);
      }

      const accessToken = await userFirebase.getIdToken()
      return {
        data: {
          user: user,
          userFirebase: userFirebase
        },
        accesToken: accessToken
      };
    } catch (error) {
      this.logger.log('An error has been ocurred');
      throw new CustomException('Error with the request', 500);
    }
  }

}
