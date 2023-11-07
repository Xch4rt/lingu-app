import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from 'libs/database/prisma/database.service';
import { RegisterUserDto } from './dto/register-user.users.dto';
import { PaginationDto } from 'libs/common/dto/pagination/pagination.dto';
import { CustomException } from 'libs/common/exceptions/custom-exception';
import { UpdateUserDto } from './dto/update-user.users.dto';
import { RegisterLangsByUser } from './dto/register-langs-user.dto';
import { PrismaClient } from '@prisma/client';
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

  async addLangPreferencesUser(langsByUserDto: RegisterLangsByUser) {
    const { langs, uid } = langsByUserDto;
    let transaction;
    const prisma = new PrismaClient();
    try {

      transaction = await prisma.$transaction([
        prisma.user.findUnique({
          where: { id: uid },
        }),
        ...langs.map((lang) =>
          prisma.language.findFirst({
            where: {
              lang: lang
            },
          })
        ),
      ]);
      const userExists = transaction[0];


      if (!userExists) {
        this.logger.error("User does not exist");
        throw new CustomException(`User with uid: ${uid} does not exist`, 401);
      }
      for (let i = 1; i < transaction.length; i++) {
        const language = transaction[i];

        if (!language) {
          this.logger.error(`Language '${langs[i - 1]}' does not exist`);
          throw new CustomException(`Language '${langs[i - 1]}' does not exist`, 400);
        }

        await prisma.user_Language.create({
          data: {
            userId: uid,
            languageId: language.id,
          },
        });
      }

      await prisma.$queryRaw`COMMIT`;


    } catch (error) {
      if (transaction) {
        await prisma.$queryRaw`ROLLBACK`;
      }
      this.logger.error(`An error has ocurred creating a preference with user uid: ${uid}`)
      throw new CustomException(`Error creating the preference for the user uid ${uid}`, 400)
    } finally {
      prisma.$disconnect();
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

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    const { firstName, lastName } = updateUserDto;

    const user = await this.dbService.user_Profile.findUnique({
      where: {
        id,
        isDeleted: false
      }
    });

    if (!user) {
      this.logger.error('User not found');
      throw new CustomException('User not found', 404);
    }

    try {
      const updateUser = await this.dbService.user_Profile.update({
        where: {
          id
        },
        data: {
          firstName,
          lastName
        }
      });

      this.logger.log('User updated successfully');

      return {
        status: 'success',
        message: 'User updated successfully',
        data: {
          id: updateUser.id,
          firstName: updateUser.firstName,
          lastName: updateUser.lastName,
          updateUser: updateUser.updatedAt,
        }
      }
    } catch (error) {
      this.logger.error(error);
      throw new CustomException('User not updated', 500);
    }
  }

  async deleteUser(id: number) {
    const user = await this.dbService.user_Profile.findUnique({
      where: {
        id,
        isDeleted: false
      }
    });

    if (!user) {
      this.logger.error('User not found');
      throw new CustomException('User not found', 404);
    }

    try {
      await this.dbService.user_Profile.update({
        where: {
          id
        },
        data: {
          isDeleted: true
        }
      });

      this.logger.log('User deleted successfully');

      return {
        status: 'success',
        message: 'User deleted successfully',
      }
    } catch (error) {
      this.logger.error(error);
      throw new CustomException('User not deleted', 500);
    }
  }

  async findUserProfileByUserId(userId: string) {
    const user = await this.dbService.user.findUnique({
      where: {
        id: userId,
        isDeleted: false
      }
    });

    if (!user) {
      this.logger.error('User not found');
      throw new CustomException('User not found', 404);
    }

    const userProfile = await this.dbService.user_Profile.findFirst({
      where: {
        user: {
          id: userId
        },
        isDeleted: false
      }
    });

    if (!userProfile) {
      this.logger.error('User profile not found');
      throw new CustomException('User profile not found', 404);
    }

    return {
      status: 'success',
      message: 'User profile retrieved successfully',
      data: {
        id: userProfile.id,
        firstName: userProfile.firstName,
        lastName: userProfile.lastName,
        iconUrl: userProfile.iconUrl,
      }
    }
  }
}
