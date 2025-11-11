import { BadRequestException, ConflictException, Controller, Get, InternalServerErrorException, NotFoundException, NotImplementedException, Post, UnauthorizedException } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  // 200 OK
  @Get('200-ok')
  getHello(): { message: string } {
    return { message: 'OK' };
  }

  // 201 Created
  @Post('201-created')
  createResource(): { message: string } {
    return { message: 'Resource created successfully.' };
  }

  // 400 Bad Request
  @Get('400-bad-request')
  badRequest(): void {
    throw new BadRequestException('This is a bad request example.');
  }

  // 401 Unauthorized
  @Get('401-unauthorized')
  unauthorized(): void {
    throw new UnauthorizedException('You are not authorized to access this resource.');
  }

  // 404 Not Found
  @Get('404-not-found')
  notFound(): void {
    throw new NotFoundException('Resource not found.');
  }

  // 409 Conflict
  @Post('409-conflict')
  conflict(): void {
    throw new ConflictException('Conflict occurred while processing your request.');
  }

  // 500 Internal Server Error
  @Get('500-internal-server-error')
  internalServerError(): void {
    throw new InternalServerErrorException('An internal server error occurred.');
  }

  // 501 Not Implemented
  @Get('501-not-implemented')
  notImplemented(): void {
    throw new NotImplementedException('This feature is not implemented yet.');
  }
}
