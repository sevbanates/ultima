import { Injectable, inject } from '@angular/core';
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TimezoneService } from 'src/app/shared/services/timeZone.service';

@Injectable()
export class RequestModifiedInterceptor implements HttpInterceptor {
    private readonly timezoneService = inject(TimezoneService);
    constructor() {}

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        if (request.method === 'POST' || request.method === 'PUT') {
            this.timezoneService.convertDateToISOString(request.body);
        }
        return next.handle(request);
    }
}
