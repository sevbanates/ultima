import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { AlertService } from 'src/app/shared/services/alert.service';
import { PermissionService } from 'src/app/shared/services/permission.service';
import { AuthService } from '../auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard
{

    /**
     * Constructor
     */
    constructor(
        private _authService: AuthService,
        private _router: Router,
         private  _permissionService : PermissionService,
         private  _alertService : AlertService
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Can match
     *
     * @param route
     * @param segments
     */
   canMatch(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> {
    return this._authService.check().pipe(
        switchMap((authenticated) => {
            if (!authenticated) {
                const attemptedUrl = `/${(segments ?? []).map(s => s.path).join('/')}`;

                // Eğer zaten auth sayfasına yönlendiriliyorsak tekrar yönlendirme yapma
                if (attemptedUrl.startsWith('/auth')) {
                    return of(true);
                }

                const redirectUrl = encodeURIComponent(attemptedUrl);
                const urlTree = this._router.parseUrl(`/auth/login?redirectURL=${attemptedUrl}`);
                return of(urlTree);
            }

            return of(true);
        })
    );
}



    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        const controller = route.data['controllerName'];
        if (!controller) return true;
    
        const actionRequired = route.data['action'];
    
        try {
          let isAuthorized = this._permissionService.checkAuthorization(controller, actionRequired);
    
          if (isAuthorized) {
              return true;
          }
    
          this._alertService.ShowErrorMessage("Yetkiniz yok!");
          this._router.navigate(["/"]);
          return false;
    
        } catch (e) {
          this._router.navigate(["/auth/login"]);
          return false;
        }
    }

    canActivateChild(
        childRoute: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        return true;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Check the authenticated status
     *
     * @param segments
     * @private
     */
    private _check(segments: UrlSegment[],route:Route): Observable<boolean | UrlTree>
    {
        // Check the authentication status
        return this._authService.check().pipe(
            switchMap((authenticated) => {
                // If the user is not authenticated...
                if ( !authenticated )
                {
                    // Redirect to the sign-in page with a redirectUrl param
                    const redirectURL = `/${segments.join('/')}`;
                    const urlTree = this._router.parseUrl(`/auth/login`);

                    return of(urlTree);
                }
               
                // Allow the access
                return of(true);
            })
        );
    }

    
}
