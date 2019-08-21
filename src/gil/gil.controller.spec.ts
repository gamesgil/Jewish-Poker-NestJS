import { Test, TestingModule } from '@nestjs/testing';
import { GilController } from './gil.controller';

describe('Gil Controller', () => {
  let controller: GilController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GilController],
    }).compile();

    controller = module.get<GilController>(GilController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
