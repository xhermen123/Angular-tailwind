import {
    Injectable
} from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpResponse
} from '@angular/common/http';

import {
    catchError,
    tap
} from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
    constructor() {
    }

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const headers = req.clone({
            setHeaders: {
                'Content-Type': 'application/json',
                accept: 'application/json'
            }
        });

        return next.handle(headers).pipe(
            tap(res => {
                if (res instanceof HttpResponse) {
                }
            }),
            catchError(error => {
                throw error;
            })
        );
    }
}
