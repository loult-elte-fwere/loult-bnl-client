import { BrowserModule } from '@angular/platform-browser';
import {forwardRef, NgModule, Provider} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import {ApiInterceptor} from './services/api-interceptor';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { HeaderBarComponent } from './components/header-bar/header-bar.component';
import { ContentTileComponent } from './components/content-tile/content-tile.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import { ContentPageComponent } from './components/content-page/content-page.component';
import {NgxMasonryModule} from 'ngx-masonry';
import { UsernameComponent } from './components/username/username.component';
import {ApiModule} from './api/api.module';
import {environment} from '../environments/environment';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

// TODO: import https://github.com/wynfred/ngx-masonry/

export const API_INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  useExisting: forwardRef(() => ApiInterceptor),
  multi: true
};

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    HeaderBarComponent,
    ContentTileComponent,
    UserPageComponent,
    ContentPageComponent,
    UsernameComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxMasonryModule,
    ApiModule.forRoot({rootUrl: environment.api_root})
  ],
  providers: [
    ApiInterceptor,
    API_INTERCEPTOR_PROVIDER
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
