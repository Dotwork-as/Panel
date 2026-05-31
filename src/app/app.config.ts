import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
  importProvidersFrom,
  APP_INITIALIZER
} from '@angular/core'
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {providePrimeNG} from 'primeng/config';
import {provideState, provideStore, StoreModule} from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import {provideRouterStore, routerReducer, RouterStateSerializer} from '@ngrx/router-store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import {
  HTTP_INTERCEPTORS, HttpClient, HttpClientModule,
  provideHttpClient,
} from '@angular/common/http';
import {HttpErrorInterceptor} from '@core/http-interceptors/http-error.interceptor';
import {HttpBaseInterceptor} from '@core/http-interceptors/http.interceptor';
import {CustomSerializer} from '@core/router/custom-serializer';
import {metaReducers, reducers} from '@core/core.state';
import {AuthEffects} from '@core/auth/auth.effects';
import {SettingsEffects} from '@core/settings/settings.effects';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core'
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {ConfirmationService, MessageService} from 'primeng/api';
import {DialogService} from 'primeng/dynamicdialog';
import {NotificationService} from '@shared/services/notification.service';
import {SIDEBAR_FEATURE_KEY} from '@shared/components/sidebar/+state/sidebar.entity';
import {SidebarReducers} from '@shared/components/sidebar/+state/sidebar.reducers';
import {SidebarEffects} from '@shared/components/sidebar/+state/sidebar.effects';
import {BREADCRUMB_FUTURE_KEY} from '@shared/components/breadcrumb/+state/breadcrumb.entity';
import {breadCrumbReducers} from '@shared/components/breadcrumb/+state/breadcrumb.reducers';
import {TABLE_FUTURE_KEY} from '@shared/components/table/+state/table.entity';
import {tableReducers} from '@shared/components/table/+state/table.reducers';
import {authReducer} from '@core/auth/auth.reducer';
import {settingsReducer} from '@core/settings/settings.reducer';
import theme from './theme/theme'
import { ThemeService } from './theme/theme.service'
import { SpinnerInterceptor } from '@core/http-interceptors/spinner.interceptor'
import { provideAngularSvgIcon } from 'angular-svg-icon'

const HttpLoaderFactory: (http: HttpClient) => TranslateHttpLoader = (http: HttpClient) =>
  new TranslateHttpLoader(http, './i18n/', '.json');

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(TranslateModule.forRoot({
      defaultLanguage: 'fa',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: theme,
        options: {
          darkModeSelector: '.dark',
          cssLayer: {
            name: 'primeng',
            order: 'theme, base, primeng'
          },
        },
      },
      ripple: true,
      overlayOptions: {
        appendTo: 'body',
      },
    }),
    provideStore(),
    provideEffects([AuthEffects, SettingsEffects, SidebarEffects]),
    provideState('auth', authReducer),
    provideState('settings', settingsReducer),
    provideState('router', routerReducer),
    provideState(SIDEBAR_FEATURE_KEY, SidebarReducers.reducer),
    provideState(BREADCRUMB_FUTURE_KEY, breadCrumbReducers),
    provideState(TABLE_FUTURE_KEY, tableReducers),
    importProvidersFrom(StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: false,
        strictActionImmutability: false,
      },
    })),
    provideRouterStore(),
    provideStoreDevtools({name: 'panel', maxAge: 25, logOnly: !isDevMode() }),
    provideHttpClient(),
    provideAngularSvgIcon(),
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpBaseInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
    { provide: RouterStateSerializer, useClass: CustomSerializer },
    NotificationService,
    MessageService,
    ConfirmationService,
    DialogService,
    ThemeService
  ]
};

