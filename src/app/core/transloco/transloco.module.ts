// import {
//   Translation,
//   TRANSLOCO_CONFIG,
//   TRANSLOCO_LOADER,
//   TRANSLOCO_TRANSPILER,
//   TRANSLOCO_MISSING_HANDLER,
//   translocoConfig,
//   TranslocoModule,
//   TranslocoService,
//   DefaultTranspiler,
//   TranslocoMissingHandlerData
// } from '@ngneat/transloco';
// import { APP_INITIALIZER, NgModule } from '@angular/core';
// import { lastValueFrom } from 'rxjs';
// import { TranslocoHttpLoader } from './transloco.http-loader';

// @NgModule({
//   exports: [TranslocoModule],
//   providers: [
//     {
//       provide: TRANSLOCO_CONFIG,
//       useValue: translocoConfig({
//         availableLangs: [
//           { id: 'en', label: 'English' },
//           { id: 'tr', label: 'Turkish' }
//         ],
//         defaultLang: 'en',
//         fallbackLang: 'en',
//         reRenderOnLangChange: true,
//         prodMode: true
//       })
//     },
//     {
//       provide: TRANSLOCO_LOADER,
//       useClass: TranslocoHttpLoader
//     },
//     {
//       provide: TRANSLOCO_TRANSPILER,
//       useClass: DefaultTranspiler
//     },
//     {
//       provide: TRANSLOCO_MISSING_HANDLER,
//       useClass: TranslocoMissingHandlerData
//     },
//     {
//       provide: APP_INITIALIZER,
//       deps: [TranslocoService],
//       useFactory: (translocoService: TranslocoService): any => (): Promise<Translation> => {
//         const defaultLang = translocoService.getDefaultLang();
//         translocoService.setActiveLang(defaultLang);
//         return lastValueFrom(translocoService.load(defaultLang));
//       },
//       multi: true
//     }
//   ]
// })
// export class TranslocoCoreModule {}
