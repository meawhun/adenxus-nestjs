import { Module } from '@nestjs/common';
import { TestsService } from './tests.service';
import { TestsGateway } from './tests.gateway';

@Module({
  providers: [TestsGateway, TestsService],
})
export class TestsModule {}
