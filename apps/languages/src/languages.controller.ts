import { Logger, Controller, Get, Post, Query  } from '@nestjs/common';
import { LanguagesService } from './languages.service';
import * as fs from 'fs';
import * as csvParser from 'csv-parser'
import { CustomException } from 'libs/common/exceptions/custom-exception';
import { PaginationDto } from 'libs/common/dto/pagination/pagination.dto';

@Controller('lang')
export class LanguagesController {
  constructor(private readonly languagesService: LanguagesService) { }
  private readonly logger = new Logger(LanguagesController.name);

  @Post('import')
  async importLanguages() {
    const filePath = 'path/csv';
    const csvData = [];

    try {
      const insertionPromises = [];
      const batchSize = 20; // Tamaño del lote
      const delayInSeconds = 20; // Tiempo de retraso en segundos

      fs.createReadStream(filePath)
        .pipe(csvParser())
        .on('data', (data) => csvData.push(data))
        .on('end', async () => {
          for (let i = 0; i < csvData.length; i++) {
            insertionPromises.push(this.languagesService.createLang({
              code: csvData[i].alpha2,
              name: csvData[i].English
            }).catch(error => {
              this.logger.error("Error, the lang already exists");
            }));

            // Inserta un lote de registros cada batchSize o al final del archivo.
            if (insertionPromises.length === batchSize || i === csvData.length - 1) {
              await Promise.all(insertionPromises); // Espera a que se completen las inserciones.
              insertionPromises.length = 0; // Limpia el array de promesas.

              // Realiza un retraso después de cada lote.
              if (i < csvData.length - 1) {
                this.logger.log("Waiting 20 sec")
                await new Promise(resolve => setTimeout(resolve, delayInSeconds * 1000));
              }
            }
          }
        });

      return {
        message: 'Languages imported successfully'
      };
    } catch (error) {
      throw new CustomException('Error with the request', 400);
    }
  }

  @Get()
  async getLangs(@Query() paginationLangDto: PaginationDto) {
    try{
      const res = await this.languagesService.getLangs(paginationLangDto);
      return res;
    } catch(error){
      this.logger.error(error)
      throw new Error(error)
    }
  }

}
