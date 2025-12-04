import { Test, TestingModule } from '@nestjs/testing';
import { TestsGateway } from './tests.gateway';
import { TestsService } from './tests.service';

describe('TestsGateway', () => {
  let gateway: TestsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestsGateway, TestsService],
    }).compile();

    gateway = module.get<TestsGateway>(TestsGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
