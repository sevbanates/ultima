import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppLayoutTitleService {

    private pageTitle = new Subject<string>();

    titleHandler = this.pageTitle.asObservable();

    setLayoutTitle(title:string) {
        this.pageTitle.next(title);
    }

}
