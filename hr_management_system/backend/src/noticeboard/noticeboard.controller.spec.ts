import { Test, TestingModule } from '@nestjs/testing';
import { NoticeboardController } from './noticeboard.controller';
import { NoticeboardService } from './noticeboard.service';

describe('NoticeboardController', () => {
  let controller: NoticeboardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NoticeboardController],
      providers: [NoticeboardService],
    }).compile();

    controller = module.get<NoticeboardController>(NoticeboardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
