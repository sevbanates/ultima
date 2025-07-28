import { Component, ElementRef, ViewChild } from '@angular/core';
import { MegaMenuItem } from 'primeng/api';
import { LayoutService } from './service/app.layout.service';
import { AuthService } from '../core/auth/auth.service';
import { timer, finalize, takeWhile, takeUntil, tap, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopbarComponent {
    
    @ViewChild('menuButton') menuButton!: ElementRef;

    @ViewChild('mobileMenuButton') mobileMenuButton!: ElementRef;

    @ViewChild('searchInput') searchInput!: ElementRef;
    
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    constructor(public layoutService: LayoutService, public el: ElementRef, private _authService: AuthService, private _router: Router) {}

    activeItem!: number;

    model: MegaMenuItem[] = [
        // {
        //     label: 'UI KIT',
        //     items: [
        //         [
        //             {
        //                 label: 'UI KIT 1',
        //                 items: [
        //                     { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formlayout'] },
        //                     { label: 'Input', icon: 'pi pi-fw pi-check-square', routerLink: ['/uikit/input'] },
        //                     { label: 'Float Label', icon: 'pi pi-fw pi-bookmark', routerLink: ['/uikit/floatlabel'] },
        //                     { label: 'Button', icon: 'pi pi-fw pi-mobile', routerLink: ['/uikit/button'] },
        //                     { label: 'File', icon: 'pi pi-fw pi-file', routerLink: ['/uikit/file'] }
        //                 ]
        //             }
        //         ],
        //         [
        //             {
        //                 label: 'UI KIT 2',
        //                 items: [
        //                     { label: 'Table', icon: 'pi pi-fw pi-table', routerLink: ['/uikit/table'] },
        //                     { label: 'List', icon: 'pi pi-fw pi-list', routerLink: ['/uikit/list'] },
        //                     { label: 'Tree', icon: 'pi pi-fw pi-share-alt', routerLink: ['/uikit/tree'] },
        //                     { label: 'Panel', icon: 'pi pi-fw pi-tablet', routerLink: ['/uikit/panel'] },
        //                     { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/uikit/charts'] }
        //                 ]
        //             }
        //         ],
        //         [
        //             {
        //                 label: 'UI KIT 3',
        //                 items: [
        //                     { label: 'Overlay', icon: 'pi pi-fw pi-clone', routerLink: ['/uikit/overlay'] },
        //                     { label: 'Media', icon: 'pi pi-fw pi-image', routerLink: ['/uikit/media'] },
        //                     { label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu'] },
        //                     { label: 'Message', icon: 'pi pi-fw pi-comment', routerLink: ['/uikit/message'] },
        //                     { label: 'Misc', icon: 'pi pi-fw pi-circle-off', routerLink: ['/uikit/misc'] }
        //                 ]
        //             }
        //         ]
        //     ]
        // },
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

    // Notification modelini burada tanımla
    notifications: { id: number; title: string; message: string; avatarUrl?: string; time: string; user: string; }[] = [
        {
            id: 1,
            title: 'Yeni Mesaj',
            message: 'How to write content about your photographs?',
            avatarUrl: 'assets/demo/images/avatar/avatar-1.png',
            time: '42 mins ago',
            user: 'Jerome Bell'
        },
        {
            id: 2,
            title: 'Blog',
            message: 'Start a blog to reach your creative peak.',
            avatarUrl: 'assets/demo/images/avatar/avatar-2.png',
            time: '48 mins ago',
            user: 'Cameron Williamson'
        },
        {
            id: 3,
            title: 'Pazarlama',
            message: 'Caring is the new marketing',
            avatarUrl: 'assets/demo/images/avatar/avatar-3.png',
            time: '1 day ago',
            user: 'Anna Miles'
        },
        {
            id: 4,
            title: 'Seyahat',
            message: 'Starting your traveling blog with Vasco.',
            avatarUrl: 'assets/demo/images/avatar/avatar-4.png',
            time: '4 day ago',
            user: 'Arlene Mccoy'
        }
    ];
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
