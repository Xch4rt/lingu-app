import { Controller, Get, Body, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { RegisterUserAuthDto } from './dto/register-user.auth.dto';
import { LoginAuthDto } from './dto/login-user.auth.dto';
import { FirebaseAuthGuard } from 'libs/guards/auth.guard';

@ApiTags('Authentification')
@Controller('v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UseGuards(FirebaseAuthGuard)
  async registerUser(@Body() registerUserDto: RegisterUserAuthDto) {
    return this.authService.registerUser(registerUserDto);
  }

  @Post('login')
  async loginUser(@Body() loginUserDto: LoginAuthDto) {
    return this.authService.loginUser(loginUserDto);
  }
}
