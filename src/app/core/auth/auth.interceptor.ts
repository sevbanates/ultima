import { Injectable, inject } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { AuthService } from 'app/core/auth/auth.service';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { AlertService } from 'app/shared/services/alert.service';
import { ResponseModel } from '../models/response-model';

@Injectable()
export class AuthInterceptor implements HttpInterceptor
{
    private readonly _alertService:AlertService=inject(AlertService);

    constructor(private _authService: AuthService)
    {
    }

    /**
     * Intercept
     *
     * @param req
     * @param next
     */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
    {
        // Clone the request object
        let newReq = req.clone();

        // Request
        //
        // If the access token didn't expire, add the Authorization header.
        // We won't add the Authorization header if the access token expired.
        // This will force the server to return a "401 Unauthorized" response
        // for the protected API routes which our response interceptor will
        // catch and delete the access token from the local storage while logging
        // the user out from the app.
        if ( this._authService.accessToken && !AuthUtils.isTokenExpired(this._authService.accessToken) )
        {
            newReq = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + this._authService.accessToken)
            });
        }

        // Response
        return next.handle(newReq).pipe(
            catchError((error) => {

                // // Catch "401 Unauthorized" responses
                if ( error instanceof HttpErrorResponse && error.status === 401 )
                {
                    // Sign out
                    this._authService.signOut();

                    // Reload the app
                    this._alertService.ShowErrorMessage(error.message);
                    setTimeout(() => {
                        location.reload();
                    }, 1000);



                }
                this._alertService.ShowErrorMessage(error.message ?? JSON.stringify(error) + ': ' + error.status);
                throw throwError(()=>new Error(error));
            }),
            tap((res: HttpEvent<any>) => this.checkErrorMessage(res))
        );
    }

    checkErrorMessage(response: HttpEvent<ResponseModel<any>>) {
        if (response instanceof HttpResponse) {
          const responseBody = response.body;
          if (responseBody && (!responseBody.IsSuccess || (responseBody.ReturnMessage && responseBody.ReturnMessage.length))) {
           if (responseBody.ReturnMessage && responseBody.ReturnMessage.length) {
              this._alertService.ShowErrorMessage(responseBody.ReturnMessage[0]);
            }

          }
        }
      }
}
