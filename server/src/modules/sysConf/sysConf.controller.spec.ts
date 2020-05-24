import { Test, TestingModule } from '@nestjs/testing';
import { InitController } from './sysConf.controller';

describe('sysConf Controller', () => {
  let controller: InitController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InitController],
    }).compile();

    controller = module.get<InitController>(InitController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
