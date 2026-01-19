import { Component, ElementRef, ViewChild } from '@angular/core';
import { MegaMenuItem } from 'primeng/api';
import { LayoutService } from './service/app.layout.service';
import { AuthService } from '../core/auth/auth.service';
import { timer, finalize, takeWhile, takeUntil, tap, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from '../modules/system-management/user/services/user.service';
import { AccounterUserDto, User } from '../modules/system-management/user/models/user-list-model';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopbarComponent {
    
    user: User;
    @ViewChild('menuButton') menuButton!: ElementRef;

    @ViewChild('mobileMenuButton') mobileMenuButton!: ElementRef;

    @ViewChild('searchInput') searchInput!: ElementRef;
    // accounterUsers: AccounterUserDto[] = [];
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    constructor(public layoutService: LayoutService, public el: ElementRef, private _authService: AuthService, private _router: Router
        ,private _userService: UserService
    ) {
        // this._userService.getAccounterUsers().subscribe((response) => {
        //     this.accounterUsers = response.EntityList;
        //     console.log(this.accounterUsers);
        // });
      
    }

    activeItem!: number;

    model: MegaMenuItem[] = [
        {
            label: 'UI KIT',
            items: [
                [
                    {
                        label: 'UI KIT 1',
                        items: [
                            { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formlayout'] },
                            { label: 'Input', icon: 'pi pi-fw pi-check-square', routerLink: ['/uikit/input'] },
                            { label: 'Float Label', icon: 'pi pi-fw pi-bookmark', routerLink: ['/uikit/floatlabel'] },
                            { label: 'Button', icon: 'pi pi-fw pi-mobile', routerLink: ['/uikit/button'] },
                            { label: 'File', icon: 'pi pi-fw pi-file', routerLink: ['/uikit/file'] }
                        ]
                    }
                ],
                [
                    {
                        label: 'UI KIT 2',
                        items: [
                            { label: 'Table', icon: 'pi pi-fw pi-table', routerLink: ['/uikit/table'] },
                            { label: 'List', icon: 'pi pi-fw pi-list', routerLink: ['/uikit/list'] },
                            { label: 'Tree', icon: 'pi pi-fw pi-share-alt', routerLink: ['/uikit/tree'] },
                            { label: 'Panel', icon: 'pi pi-fw pi-tablet', routerLink: ['/uikit/panel'] },
                            { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/uikit/charts'] }
                        ]
                    }
                ],
                [
                    {
                        label: 'UI KIT 3',
                        items: [
                            { label: 'Overlay', icon: 'pi pi-fw pi-clone', routerLink: ['/uikit/overlay'] },
                            { label: 'Media', icon: 'pi pi-fw pi-image', routerLink: ['/uikit/media'] },
                            { label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu'] },
                            { label: 'Message', icon: 'pi pi-fw pi-comment', routerLink: ['/uikit/message'] },
                            { label: 'Misc', icon: 'pi pi-fw pi-circle-off', routerLink: ['/uikit/misc'] }
                        ]
                    }
                ]
            ]
        }
        // {
        //     label: 'UTILITIES',
        //     items: [
        //         [
        //             {
        //                 label: 'UTILITIES 1',
        //                 items: [
        //                     { label: 'Icons', icon: 'pi pi-fw pi-prime', routerLink: ['utilities/icons'] },
        //                     { label: 'PrimeFlex', icon: 'pi pi-fw pi-desktop', url: 'https://www.primefaces.org/primeflex/', target: '_blank' }
        //                 ]
        //             }
        //         ],

        //     ]
        // }
    ];

    // Sol taraftaki dropdown için örnek veri
    // leftDropdownOptions: { label: string; value: string }[] = [
    //     { label: 'Tümü', value: 'all' },
    //     { label: 'Bekleyen', value: 'pending' },
    //     { label: 'Onaylı', value: 'approved' },
    //     { label: 'Reddedilen', value: 'rejected' }
    // ];
    selectedLeftOption: number;

    onLeftDropdownChange(value: number) {
        this.selectedLeftOption = value;
        // Gerekirse event emit veya filtreleme işlemleri burada tetiklenebilir
    }

    // getLeftOptionLabel(value: number): string {
    //     const found = this.accounterUsers.find((o) => o.UserId === value);
    //     return found ? found.FullName : 'Filtre';
    // }

    get isAccounter(): boolean {
        try {
            const roleId = this._authService?.userData?.RoleId;
            const isAccounterRole = roleId === 102;
            
            // console.log('🔥 Topbar isAccounter check:', { roleId, isAccounterRole });
            
            return isAccounterRole;
        } catch {
            return false;
        }
    }

    // Notification modelini burada tanımla
    notifications: { id: number; title: string; message: string; avatarUrl?: string; time: string; user: string; }[] = [];
    notificationCount = this.notifications.length;

    get mobileTopbarActive(): boolean {
        return this.layoutService.state.topbarMenuActive;
    }

    onMenuButtonClick() {
        this.layoutService.onMenuToggle();
    }

    onRightMenuButtonClick() {
        this.layoutService.openRightSidebar();
    }

    onMobileTopbarMenuButtonClick() {
        this.layoutService.onTopbarMenuToggle();
    }

    focusSearchInput(){
       setTimeout(() => {
         this.searchInput.nativeElement.focus()
       }, 0);
    }

    signOut(){
        this._authService.signOut();
        this._router.navigate(['auth/login']);  
    }
    navigateToProfile(){
         this._router.navigate(['/profile']);  
    }
}
