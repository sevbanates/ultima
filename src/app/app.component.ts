import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { LoaderService } from './shared/services/loader.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
    isLoading$ = this.loaderService.isLoading$;
    constructor(private primengConfig: PrimeNGConfig, private loaderService: LoaderService) {}

    ngOnInit(): void {
        this.primengConfig.ripple = true;
    }
}
