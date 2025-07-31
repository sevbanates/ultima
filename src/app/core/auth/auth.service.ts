import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject, switchMap, takeUntil, tap, throwError } from 'rxjs';
import { ResponseModel } from '../models/response-model';
import { LocalStorageType } from '../enums/local-storage-type.enum';
import { Role } from '../enums/role.enum';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { UserService } from '../user/user.service';
import { AuthUtils } from './auth.utils';
import { environment } from 'src/app/environments/environment.dev';
import { ForgotPasswordModel, LoginModel, LoginUserInfo, ResetPasswordModel, User } from 'src/app/modules/system-management/user/models/user-list-model';

@Injectable()
export class AuthService {
    private _authenticated: boolean = false;
    private readonly apiUrl = environment.restApiUrl;
     //TODO
    // protected readonly _navigationService: NavigationService = inject(NavigationService);
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    constructor(
        private readonly _httpClient: HttpClient,
        private readonly _userService: UserService,
        private readonly _localStorageService: LocalStorageService,
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    set accessToken(token: string) {
        this._localStorageService.setItem(LocalStorageType.token, token)
    }

    get accessToken(): string {
        return this._localStorageService.getItem(LocalStorageType.token) ?? '';
    }

    set userData(user: User) {
        this._localStorageService.setItem(LocalStorageType.userData, user)
    }

    get userData(): User {
        return this._localStorageService.getItem(LocalStorageType.userData)
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    sendConfirmCode(credentials: LoginModel): Observable<ResponseModel<LoginUserInfo>>
    {
        return this._httpClient.post<ResponseModel<LoginUserInfo>>(`${this.apiUrl}auth/send-confirm-code`, credentials);

    }

    signInConfirmCode(model:LoginModel): Observable<ResponseModel<User>> {

        if (this._authenticated) {
            return throwError(() => new Error('User is already logged in.'));
        }

        return this._httpClient.post<ResponseModel<User>>(`${this.apiUrl}auth/login`, model).pipe(
            switchMap((response: ResponseModel<User>) => {

                // TODO:SORULACAK USERMODEL
                // Store the access token in the local storage
                this.accessToken = response.Entity.Token;

                // Set the authenticated flag to true
                this._authenticated = true;
                if (response.Entity.RoleId === Role.Admin) {
                    response.Entity.IsAdmin = true;
                }
                else {
                    response.Entity.IsAdmin = false;
                }

                if (response.Entity.RoleId === Role.User) {
                    response.Entity.IsUser = true;
                }
                else {
                    response.Entity.IsUser = false;
                }
                if (response.Entity.RoleId === Role.Accounter) {
                    response.Entity.IsAccounter = true;
                }
                else {
                    response.Entity.IsAccounter = false;
                }

                // Store the user on the user service

                //TODO
                // this._userService.user = response.Entity;
                this.userData = response.Entity;
                 //TODO
                // this._navigationService.user = this.userData;
                // this._navigationService.get();

                // Return a new observable with the response
                return of(response);
            })
        );
    }


    forgotPassword(credentials: ForgotPasswordModel): Observable<ResponseModel<boolean>> {
        return this._httpClient.post<ResponseModel<boolean>>(`${this.apiUrl}auth/forgot-password`, credentials);
    }

    resetPassword(model:ResetPasswordModel): Observable<ResponseModel<boolean>> {
        return this._httpClient.put<ResponseModel<boolean>>(`${this.apiUrl}auth/reset-password`, model);
    }


    signOut(): Observable<any> {
        this._localStorageService.removeAllItem();
        this._authenticated = false;
        return of(true);
    }


    check(): Observable<boolean> {
        // Check if the user is logged in
        if (this._authenticated) {
            return of(true);
        }

        // Check the access token availability
        if (!this.accessToken || this.accessToken === 'null') {
            return of(false);
        }

        // Check the access token expire date
        if (AuthUtils.isTokenExpired(this.accessToken)) {
            return of(false);
        }

        if (!this.userData) {
            return of(false);
        }

    //TODO
        // this._userService._user.next(this.userData);
        this._authenticated = true;
        return of(true);
        // If the access token exists and it didn't expire, sign in using it
        //return this.signInUsingToken();
    }







}
