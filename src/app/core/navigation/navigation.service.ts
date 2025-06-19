import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, ReplaySubject, Subject, of, takeUntil, tap } from "rxjs";
import { Navigation } from "app/core/navigation/navigation.types";
import { LocalStorageService } from "app/shared/services/local-storage.service";
import { LocalStorageType } from "../enums/local-storage-type.enum";
import { FuseNavigationItem } from "@fuse/components/navigation";
import { User } from "app/modules/system-management/user/models/user-list-model";

@Injectable({
  providedIn: "root",
})
export class NavigationService {
  private _navigation: ReplaySubject<Navigation> = new ReplaySubject<Navigation>(1);
  public user: User = inject(LocalStorageService).getItem(LocalStorageType.userData);
  item: FuseNavigationItem[] = [];

  constructor(private _httpClient: HttpClient) {}

  get navigation$(): Observable<Navigation> {
    return this._navigation.asObservable();
  }

  get(): Observable<Navigation> {
    let nav = {} as Navigation;
    if (this.user.IsAdmin ) {
      nav.default = [
        {
          id: "modules",
          title: "Web Site Yönetim Paneli",
        //   subtitle: "Uygulama Modülleri",
          type: "group",
          icon: "heroicons_outline:home",
          hidden: false,
          children: [
            {
              id: "home",
              title: "Anasayfa",
              type: "basic",
              icon: "heroicons_outline:home",
              link: "/dashboard",
            },
            {
                id: "websites",
                title: "Web Siteleri",
                type: "basic",
                icon: "mat_solid:web",
                link: "/siteler",
              },
            {
              id: "pages",
              title: "Sayfalarım",
              type: "basic",
              icon: "mat_solid:pages",
              link: "/sayfalar",

            },
            {
                id: "users",
                title: "Kullanıcılar",
                type: "basic",
                icon: "heroicons_outline:users",
                link: "/kullanicilar",
            },
           // {
            //   id: "schedule",
            //   title: "Calendar",
            //   type: "basic",
            //   icon: "heroicons_outline:calendar",
            //   link: "/schedule",
            // },

            // {
            //   id: "library",
            //   title: "Resources",
            //   type: "basic",
            //   icon: "heroicons_outline:building-library",
            //   link: "/library",
            // },
            // {
            //   id: "inquiries",
            //   title: "Inquiries",
            //   type: "basic",
            //   icon: "heroicons_outline:calendar",
            //   link: "/inquiry",
            // },
            // {
            //   id: "message",
            //   title: "Messages",
            //   type: "basic",
            //   icon: "heroicons_outline:envelope",
            //   link: "/message",
            // },


            {
              id: "settings",
              title: "Ayarlar",
              type: "collapsable",
              hidden: !this.user.IsAdmin,
              icon: "heroicons_outline:cog",
              children: [

                // {
                //   id: "user",
                //   title: "Users",
                //   type: "basic",
                //   icon: "heroicons_outline:user",
                //   link: "/user",
                // },
                {
                  id: "controller",
                  title: "Güvenlik",
                  type: "basic",
                  icon: "heroicons_outline:wrench-screwdriver",
                  link: "/controller",
                },
              ],
            },

          ],
        },

      ];
    } else if (this.user.IsUser) {
      nav.default = [
        {
            id: "modules",
            title: "Web Site Yönetim Paneli",
          //   subtitle: "Uygulama Modülleri",
            type: "group",
            icon: "heroicons_outline:home",
            hidden: false,
            children: [
              {
                id: "home",
                title: "Anasayfa",
                type: "basic",
                icon: "heroicons_outline:home",
                link: "/dashboard",
              },
              {
                  id: "websites",
                  title: "Web Sitem",
                  type: "basic",
                  hidden: !this.user.IsAdmin,
                  icon: "mat_solid:web",
                  link: "/consultants",
                },
              {
                id: "pages",
                title: "Sayfalarım",
                type: "basic",
                icon: "mat_solid:pages",
                link: "/client",
              //   children: [
              //     {
              //       id: "client",
              //       title: "All Clients",
              //       type: "basic",
              //       icon: "heroicons_outline:users",
              //       link: "/client",
              //     },
              //     {
              //       id: "activeclient",
              //       title: "Active Clients",
              //       type: "basic",
              //       icon: "heroicons_outline:users",
              //       link: "/active-client",
              //     },
              //     {
              //       id: "inactiveclient",
              //       title: "Inactive Clients",
              //       type: "basic",
              //       icon: "heroicons_outline:users",
              //       link: "/inactive-client",
              //     },
              //     {
              //       id: "potentialstudent",
              //       title: "Potential Clients",
              //       type: "basic",
              //       icon: "heroicons_outline:clipboard-document-list",
              //       link: "/potential-student",
              //     },
              //   ],
              },
            // {
            //   id: "library",
            //   title: "Resources",
            //   type: "basic",
            //   icon: "heroicons_outline:building-library",
            //   link: "/library",
            // },
            // {
            //   id: "room",
            //   title: "Room",
            //   type: "basic",
            //   icon: "heroicons_outline:computer-desktop",
            //   link: "/room",
            // },
            // {
            //     id: "message",
            //     title: "Messages",
            //     type: "basic",
            //     icon: "heroicons_outline:envelope",
            //     link: "/message",
            //   },


          ],
        },
      ];
    }
    this._navigation.next(nav);
    return of(nav);
  }


}
