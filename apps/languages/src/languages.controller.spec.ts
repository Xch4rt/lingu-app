import { Test, TestingModule } from '@nestjs/testing';
import { LanguagesController } from './languages.controller';
import { LanguagesService } from './languages.service';

describe('LanguagesController', () => {
  let languagesController: LanguagesController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [LanguagesController],
      providers: [LanguagesService],
    }).compile();

    languagesController = app.get<LanguagesController>(LanguagesController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(languagesController.getHello()).toBe('Hello World!');
    });
  });
});
