import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RegisterUserAuthDto } from './dto/register-user.auth.dto';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    authController = app.get<AuthController>(AuthController);
    authService = app.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  it('should register an user', async () => {
    const registerUserDto: RegisterUserAuthDto = {
      username: 'test1',
      email: 'test@test123.com',
      password: '123'
    };

    const registerUserSpy = jest.spyOn(authService, 'registerUser').mockResolvedValue({
      status: 'success',
      message: 'User created successfully',
      data: {
        username: 'test1',
        email: 'test@test123.com',
        createdAt: new Date(),
      }
    });

    const result = await authController.registerUser(registerUserDto);

    expect(result).toEqual({
      status: 'success',
      message: 'User created successfully',
      data: {
        username: 'test1',
        email: 'test@test123.com',
        createdAt: new Date(),
      }
    });

    expect(registerUserSpy).toHaveBeenCalledWith(registerUserDto);
  });

  it('should login an user', async () => {
    const loginUserDto = {
      username: 'test1',
      password: '123'
    };

    const loginUserSpy = jest.spyOn(authService, 'loginUser').mockResolvedValue({
      status: 'success',
      message: 'User logged in successfully',
      data: {
        id: 2,
        username: 'test1',
        email: 'test@test123.com',
      }
    });

    const result = await authController.loginUser(loginUserDto);

    expect(result).toEqual({
      status: 'success',
      message: 'User logged in successfully',
      data: {
        id: 2,
        username: 'test1',
        email: 'test@test123.com',
      }
    });

    expect(loginUserSpy).toHaveBeenCalledWith(loginUserDto);
  });

});
