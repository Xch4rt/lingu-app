import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from 'libs/database/prisma/database.service';
import { RegisterUserDto } from './dto/register-user.users.dto';
import { PaginationDto } from 'libs/common/dto/pagination/pagination.dto';
import { CustomException } from 'libs/common/exceptions/custom-exception';
@Injectable()
export class UsersService {
  constructor(private readonly dbService: DatabaseService) { }

  private readonly logger = new Logger(UsersService.name);

  async registerUser(registerUserDto: RegisterUserDto) {
    const { firstName, lastName, userId } = registerUserDto;
    try {
      const createUser = await this.dbService.user_Profile.create({
        data: {
          firstName,
          lastName,
          iconUrl: "",
          userId
        }
      });

      this.logger.log('User created successfully');

      return {
        status: 'success',
        message: 'User created successfully',
        data: {
          id: createUser.id,
          firstName: createUser.firstName,
          lastName: createUser.lastName,
          iconUrl: createUser.iconUrl,
          userId: createUser.userId,
          createdAt: createUser.createdAt,
        }
      }
    } catch (error) {
      this.logger.error(error);
      throw new CustomException('User not created', 500);
    }
  }

  async findAll(paginationDto: PaginationDto) {

    const { page = 1, perPage = 10 } = paginationDto;

    const skip: number = (page - 1) * perPage;


    const [users, total] = await Promise.all([this.dbService.user_Profile.findMany({
      where: {
        isDeleted: false
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        isDeleted: true,
        createdAt: true,
        updatedAt: true,
      },
      skip,
      take: perPage
    }),
    this.dbService.user_Profile.count({
      where: {
        isDeleted: false
      }
    })]);

    if (!users) {
      this.logger.error('Users not found');
      throw new CustomException('Users not found', 404);
    }

    return {
      status: 'success',
      message: 'Users retrieved successfully',
      data: users,
      metaData: {
        page,
        lastPage: Math.ceil(total / perPage),
        total
      }
    }
  }
}
