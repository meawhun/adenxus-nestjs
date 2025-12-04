import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { TestsService } from './tests.service';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';

@WebSocketGateway()
export class TestsGateway {
  constructor(private readonly testsService: TestsService) {}

  @SubscribeMessage('createTest')
  create(@MessageBody() createTestDto: CreateTestDto) {
    return this.testsService.create(createTestDto);
  }

  @SubscribeMessage('findAllTests')
  findAll() {
    return this.testsService.findAll();
  }

  @SubscribeMessage('findOneTest')
  findOne(@MessageBody() id: number) {
    return this.testsService.findOne(id);
  }

  @SubscribeMessage('updateTest')
  update(@MessageBody() updateTestDto: UpdateTestDto) {
    return this.testsService.update(updateTestDto.id, updateTestDto);
  }

  @SubscribeMessage('removeTest')
  remove(@MessageBody() id: number) {
    return this.testsService.remove(id);
  }
}
