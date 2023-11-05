import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from 'libs/database/prisma/database.service';
import { CustomException } from 'libs/common/exceptions/custom-exception';
import { CreateLangDto } from './dto/create-lang.dto';
import { PaginationDto } from 'libs/common/dto/pagination/pagination.dto';

@Injectable()
export class LanguagesService {
  constructor(private readonly dbService: DatabaseService) { }

  private readonly logger = new Logger(LanguagesService.name);

  getHello(): string {
    return 'Hello World!';
  }

  async createLang(createLangDto: CreateLangDto) {
    const { code, name } = createLangDto;

    try {

      const lagnExist = await this.dbService.language.findFirst({
        where: {
          code: code
        }
      });

      if (lagnExist) {
        this.logger.error('Lang ' + lagnExist.lang + ' already exist');
        throw new CustomException('Lang already exists', 400);
      }

      const lang_ = await this.dbService.language.create({
        data: {
          code: code,
          lang: name
        }
      });

      this.logger.log('Lang created successfully');

      return {
        status: 'success',
        message: 'Lang creatd successfully',
        data: {
          code: lang_.code,
          lang: lang_.lang,
          createdAt: lang_.createdAt
        }
      }
    } catch (error) {
      this.logger.error('An error has been ocurred', error)
      throw new CustomException('Error with the request', 500)
    }

  }

  async getLangs(paginationLangDto: PaginationDto) {
    const { page = 1, perPage = 10, search = '' } = paginationLangDto;
    const skip: number = Number((page - 1) * perPage);
    const take: number = Number(perPage);

    const whereClause: any = search
      ? {
        OR: [
          {
            code: {
              contains: search, mode: 'insensitive'
            },
          },
          {
            lang: {
              contains: search, mode: 'insensitive'
            }
          }
        ]
      } : {};

    try {
      const totalLangs = await this.dbService.language.count({
        where: whereClause
      });

      const langs = await this.dbService.language.findMany({
        where: whereClause,
        take: take,
        skip: skip
      });

      if (!langs) {
        throw new CustomException("Cannot find the lang", 401);
      }

      return {
        data: {
          langs: langs
        },
        metaData: {
          page,
          lastPage: Math.ceil(totalLangs / perPage),
          totalLangs
        }
      }
    } catch (error) {
      this.logger.error("An error has occurred finding some langs: ", error);
      throw new CustomException("Error with finding lang", 400)
    }
  }

  async getLangsByUser(paginationLangDto: PaginationDto, userId: string) {
    const { page = 1, perPage = 10, search = '' } = paginationLangDto;
    const skip: number = Number((page - 1) * perPage);
    const take: number = Number(perPage);

    const whereClause: any = search
      ? {
        userId: userId,
        lang: {
          OR: [
            {
              code: {
                contains: search,
                mode: 'insensitive'
              },
            },
            {
              lang: {
                contains: search,
                mode: 'insensitive'
              }
            }
          ]
        }
      }
      : { userId: userId };

    try {
      const userLanguages = await this.dbService.user_Language.findMany({
        where: whereClause,
        take: take,
        skip: skip
      });

      const totalLangs = userLanguages.length;

      return {
        data: {
          userLanguages: userLanguages
        },
        metaData: {
          page,
          lastPage: Math.ceil(totalLangs / perPage),
          totalLangs
        }
      }
    } catch (error) {
      this.logger.error("An error has occurred finding user languages: ", error);
      throw new CustomException("Error with finding user languages", 400);
    }


  }
}
