import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable()
export class LogInterceptor implements NestInterceptor {
    private logger = new Logger(LogInterceptor.name);

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const ctx = context.switchToHttp();
        const request: Request | any = ctx.getRequest<Request>();

        const requestObject = {
            requestId: request.headers.requestId || null,
            url: request.url || null,
            method: request.method || null,
            headers: request.headers || null,
            body: request.body || null,
            path: request.originalUrl || null,
            query: request.query || null,
            user: request.user || null,
        };

        this.logger.log({
            request: requestObject,
        });

        return next.handle().pipe(
            tap((response) => {
                this.logger.log({
                    request: requestObject, response,
                });
            }),
            catchError((err) => {
                this.logger.error({
                    label: request.url, method: request.method, message: { error: err },
                });
                return throwError(() => err);
            }),
        );
    }
}
