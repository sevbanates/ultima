import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { RequestModifiedInterceptor } from './interceptors/request-modified.interceptor';
import { TranslocoCoreModule } from './transloco/transloco.module';
import { IconsModule } from './icons/icons.module';
import { AuthModule } from './auth/auth.module';

@NgModule({
    imports: [
        AuthModule,
        IconsModule,
        TranslocoCoreModule
    ],
    providers: [
        {
            provide : HTTP_INTERCEPTORS,
            useClass: RequestModifiedInterceptor,
            multi   : true
        }
    ]
})
export class CoreModule
{
    /**
     * Constructor
     */
    constructor(
        @Optional() @SkipSelf() parentModule?: CoreModule
    )
    {
        // Do not allow multiple injections
        if ( parentModule )
        {
            throw new Error('CoreModule has already been loaded. Import this module in the AppModule only.');
        }
    }
}
