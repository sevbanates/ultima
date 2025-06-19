import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { AuthService } from 'app/core/auth/auth.service';
import { PermissionService } from 'app/shared/services/permission.service';
import { ActionsType } from 'app/core/enums/actions-enum/actions.enum';
import { AlertService } from 'app/shared/services/alert.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard
{
    private readonly _permissionService=inject(PermissionService);
    private readonly _alertService=inject(AlertService);
    /**
     * Constructor
     */
    constructor(
        private _authService: AuthService,
        private _router: Router
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
    canMatch(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
    {
        return this._check(segments,route);
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
    
          this._alertService.ShowErrorMessage("You are not permitted!");
          this._router.navigate(["/"]);
          return false;
    
        } catch (e) {
          this._router.navigate(["/sign-in"]);
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
                    const urlTree = this._router.parseUrl(`sign-in?redirectURL=${redirectURL}`);

                    return of(urlTree);
                }
               
                // Allow the access
                return of(true);
            })
        );
    }

    
}
