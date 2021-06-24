import '../styles/styles.scss';
import '../styles/headings.css';

import { AppState, InternalStateType } from './app.service';
import { PreloadAllModules, RouterModule } from '@angular/router';

import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AboutComponent } from './about';
// App is our top level component
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { DevModuleModule } from './+dev-module';
import { FooterComponent } from './bb-ui/components/footer/footer.component'
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home';
import { HttpClientModule } from '@angular/common/http';
import { LogoComponent } from './bb-ui/components/logo/logo.component';
import { NgModule } from '@angular/core';
import { NoContentComponent } from './no-content';
import { ROUTES } from './app.routes';
import { XLargeDirective } from './home/x-large';
/*
 * Platform and Environment providers/directives/pipes
 */
import { environment } from 'environments/environment';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState
];

interface StoreType {
  state: InternalStateType;
  restoreInputValues: () => void;
  disposeOldHosts: () => void;
}

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    AboutComponent,
    HomeComponent,
    NoContentComponent,
    XLargeDirective,
	LogoComponent,
	FooterComponent
  ],
  /**
   * Import Angular's modules.
   */
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES, {
      useHash: Boolean(history.pushState) === false,
      preloadingStrategy: PreloadAllModules
    }),

    /**
     * This section will import the `DevModuleModule` only in certain build types.
     * When the module is not imported it will get tree shaked.
     * This is a simple example, a big app should probably implement some logic
     */
    ...environment.showDevModule ? [ DevModuleModule ] : [],
  ],
  /**
   * Expose our Services and Providers into Angular's dependency injection.
   */
  providers: [
    environment.ENV_PROVIDERS,
    APP_PROVIDERS
  ]
})
export class AppModule {}
