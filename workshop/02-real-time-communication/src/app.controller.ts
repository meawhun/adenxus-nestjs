import { Controller, Get } from '@nestjs/common';
import { Sse } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Sse('sse')
  sse(): Observable<{ data: string }> {
    return this.appService.getSse();
  }
}
