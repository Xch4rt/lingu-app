import { Test, TestingModule } from '@nestjs/testing';
import { WordsController } from './words.controller';
import { WordsService } from './words.service';

describe('WordsController', () => {
  let wordsController: WordsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [WordsController],
      providers: [WordsService],
    }).compile();

    wordsController = app.get<WordsController>(WordsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(wordsController.getHello()).toBe('Hello World!');
    });
  });
});
