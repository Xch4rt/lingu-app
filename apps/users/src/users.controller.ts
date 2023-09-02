import { Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { RegisterUserDto } from './dto/register-user.users.dto';
import { PaginationDto } from 'libs/common/dto/pagination/pagination.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async registerUser(registerUserDto: RegisterUserDto) {
    return this.usersService.registerUser(registerUserDto);
  }

  @Get()
  async findAll(paginationDto : PaginationDto) {
    return this.usersService.findAll(paginationDto);
  }
}
