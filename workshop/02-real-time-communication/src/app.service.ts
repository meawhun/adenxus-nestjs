import { Injectable } from '@nestjs/common';
import { Observable, interval, map } from 'rxjs';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  // SSE stream method
  getSse(): Observable<{ data: string }> {
    return interval(1000).pipe(
      map((count) => ({
        data: `SSE message #${count}`,
      }))
    );
  }
}
