import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { BadgeModule } from 'primeng/badge';
import { TooltipModule } from 'primeng/tooltip';
import { Router } from '@angular/router';
import { User } from 'src/app/modules/system-management/user/models/user-list-model';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-settings-list',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    DividerModule,
    BadgeModule,
    TooltipModule
  ],
  templateUrl: './settings-list.component.html',
  styleUrl: './settings-list.component.scss'
})
export class SettingsListComponent {

  user : User;
  settingsCategories = [];

  constructor(private router: Router,  private _authService: AuthService,) {
    this.user = this._authService.userData;
    this.settingsCategories = this.user.IsAccounter ? [ 
      {
        id: 'incoming-requests',
        title: this.getRequestTitle(),
        description: this.getRequestDescription(),
        icon: 'pi pi-inbox',
        color: 'primary',
        badge: '3',
        route: '/settings/recieved-requests',
        // features: [
        //   'Yeni istek bildirimleri',
        //   'İstek durumu takibi',
        //   'Otomatik yanıt ayarları'
        // ]
      },
      {
        id: 'profile-settings',
        title: 'Profil Ayarları',
        description: 'Kişisel bilgilerinizi ve hesap ayarlarınızı düzenleyin',
        icon: 'pi pi-user',
        color: 'success',
        route: '/settings/profile',
        // features: [
        //   'Kişisel bilgi güncelleme',
        //   'Şifre değiştirme',
        //   'Bildirim tercihleri'
        // ]
      },
      {
        id: 'invoice-settings',
        title: 'Varsayılan Fatura Ayarları',
        description: 'Fatura şablonları ve varsayılan ayarları yapılandırın',
        icon: 'pi pi-file-pdf',
        color: 'warning',
        route: '/settings/invoice',
        // features: [
        //   'Fatura şablonları',
        //   'Varsayılan vergi oranları',
        //   'Ödeme koşulları'
        // ]
      }
    ] : [
      {
        id: 'incoming-requests',
        title: this.getRequestTitle(),
        description: this.getRequestDescription(),
        icon: 'pi pi-inbox',
        color: 'primary',
        badge: '3',
        route: '/settings/recieved-requests',
        // features: [
        //   'Yeni istek bildirimleri',
        //   'İstek durumu takibi',
        //   'Otomatik yanıt ayarları'
        // ]
      },
      {
        id: 'create-requests',
        title: 'İstek Oluştur',
        description: 'Muhasebecinize istek gönderin',
        icon: 'pi pi-plus',
        color: 'primary',
        // badge: '3',
        route: '/settings/accounter/create-requests',
        // features: [
        //   'Yeni istek bildirimleri',
        //   'İstek durumu takibi',
        //   'Otomatik yanıt ayarları'
        // ]
      },
      {
        id: 'profile-settings',
        title: 'Profil Ayarları',
        description: 'Kişisel bilgilerinizi ve hesap ayarlarınızı düzenleyin',
        icon: 'pi pi-user',
        color: 'success',
        route: '/settings/profile',
        // features: [
        //   'Kişisel bilgi güncelleme',
        //   'Şifre değiştirme',
        //   'Bildirim tercihleri'
        // ]
      },
      {
        id: 'invoice-settings',
        title: 'Varsayılan Fatura Ayarları',
        description: 'Fatura şablonları ve varsayılan ayarları yapılandırın',
        icon: 'pi pi-file-pdf',
        color: 'warning',
        route: '/settings/invoice',
        // features: [
        //   'Fatura şablonları',
        //   'Varsayılan vergi oranları',
        //   'Ödeme koşulları'
        // ]
      }
    ]
  }
 
  getRequestTitle() : string{
    if(this.user.IsAccounter){
      return 'Gelen İstekler';
    }
    else if(this.user.IsAdmin){
      return 'İstekler';
    }
    return 'Gönderilen İstekler';
  }
  getRequestDescription() : string{
    if(this.user.IsAccounter){
      return 'Gelen istekleri yönetin ve yanıtlayın';
    }
    else if(this.user.IsAdmin){
      return 'İstekleri yönetin';
    }
    return 'Gönderilen istekleri yönetin';
  }
  navigateToSettings(category: any) {
    this.router.navigate([category.route]);
  }
}
