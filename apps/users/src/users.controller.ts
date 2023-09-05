import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { RegisterUserDto } from './dto/register-user.users.dto';
import { PaginationDto } from 'libs/common/dto/pagination/pagination.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async registerUser(@Body() registerUserDto: RegisterUserDto) {
    return this.usersService.registerUser(registerUserDto);
  }

  @Get()
  async findAll(@Param() paginationDto : PaginationDto) {
    return this.usersService.findAll(paginationDto);
  }

  @Get('profile/:id')
  async findOne(@Param() id: string) {
    return this.usersService.findUserProfileByUserId(+id);
  }

  @Delete(':id')
  async remove(@Param() id: string) {
    return this.usersService.deleteUser(+id);
  }

  @Post('update/:id')
  async update(@Param() id: string, @Body() updateUserDto: RegisterUserDto) {
    return this.usersService.updateUser(+id, updateUserDto);
  }
}
