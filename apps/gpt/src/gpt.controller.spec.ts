import { Test, TestingModule } from '@nestjs/testing';
import { GptController } from './gpt.controller';
import { GptService } from './gpt.service';

describe('GptController', () => {
  let gptController: GptController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [GptController],
      providers: [GptService],
    }).compile();

    gptController = app.get<GptController>(GptController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(gptController.getHello()).toBe('Hello World!');
    });
  });
});
