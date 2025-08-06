import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { AuthService } from '../auth.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { LocalStorageType } from 'src/app/core/enums/local-storage-type.enum';
import { User } from 'src/app/modules/system-management/user/models/user-list-model';
import { SupportService } from 'src/app/modules/support/services/support.service';
import { AlertService } from 'src/app/shared/services/alert.service';

@Injectable({
    providedIn: 'root'
})
export class ResourceOwnerGuard {

    constructor(
        private _authService: AuthService,
        private _router: Router,
        private _localStorageService: LocalStorageService,
        private _supportService: SupportService,
        private _alertService: AlertService
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> {
        
        // Admin kullanıcıları her şeyi görebilir
        const currentUser = this._localStorageService.getItem(LocalStorageType.userData) as User;
        if (currentUser?.IsAdmin) {
            return of(true);
        }

        // Route parametrelerini al
        const ticketId = route.paramMap.get('id');
        const guidId = route.paramMap.get('guidId');

        if (!ticketId || !guidId) {
            this._alertService.ShowErrorMessage("Geçersiz ticket bilgileri!");
            this._router.navigate(['/support']);
            return of(false);
        }

        // Ticket'ı kontrol et ve sahiplik doğrulaması yap
        return this._supportService.getTicket(Number(ticketId), guidId).pipe(
            switchMap((response) => {
                if (!response.IsSuccess) {
                    this._alertService.ShowErrorMessage("Ticket bulunamadı!");
                    this._router.navigate(['/support']);
                    return of(false);
                }

                // Ticket'ın sahibi mi kontrol et
                const ticket = response.Entity;
                const currentUserId = currentUser.Id.toString();
                
                // Kullanıcı ticket'ın yaratıcısı mı yoksa atanmış kişi mi kontrol et
                if (Number(ticket.CreatedBy) !== Number(currentUserId)) {
                    this._alertService.ShowErrorMessage("Bu ticket'a erişim yetkiniz bulunmamaktadır!");
                    this._router.navigate(['/support']);
                    return of(false);
                }

                return of(true);
            })
        );
    }
}