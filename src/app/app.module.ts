import {BrowserModule} from '@angular/platform-browser';
import {forwardRef, NgModule, Provider} from '@angular/core';

import { ClipboardModule } from 'ngx-clipboard';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ApiInterceptor} from './services/api-interceptor';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HeaderBarComponent} from './components/header-bar/header-bar.component';
import {ContentTileComponent} from './components/content-tile/content-tile.component';
import {UserPageComponent} from './components/user-page/user-page.component';
import {NgxMasonryModule} from 'ngx-masonry';
import {UsernameComponent} from './components/commons/username/username.component';
import {ApiModule} from './api/api.module';
import {environment} from '../environments/environment';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgbPopoverModule, NgbToastModule, NgbTooltipModule, NgbTypeaheadModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {UploadModalComponent} from './components/modals/upload-modal/upload-modal.component';
import {ContentWallComponent} from './components/content-wall/content-wall.component';
import {SubmissionPropertiesEditorComponent} from './components/modals/submission-properties-editor/submission-properties-editor.component';
import {TagComponent} from './components/commons/tag/tag.component';
import {ToastContainerComponent} from './components/toast-container/toast-container.component';
import { TagPageComponent } from './components/tag-page/tag-page.component';
import { ContentPageComponent } from './components/content-page/content-page.component';
import { EditModalComponent } from './components/modals/edit-modal/edit-modal.component';
import { ConfirmationModalComponent } from './components/modals/confirmation-modal/confirmation-modal.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { TagsListComponent } from './components/tags-list/tags-list.component';
import { HelpModalComponent } from './components/modals/help-modal/help-modal.component';

// TODO: import https://github.com/wynfred/ngx-masonry/

export const API_INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  useExisting: forwardRef(() => ApiInterceptor),
  multi: true
};

@NgModule({
  declarations: [
    AppComponent,
    ContentWallComponent,
    HeaderBarComponent,
    ContentTileComponent,
    UserPageComponent,
    UsernameComponent,
    UploadModalComponent,
    SubmissionPropertiesEditorComponent,
    TagComponent,
    ToastContainerComponent,
    TagPageComponent,
    ContentPageComponent,
    EditModalComponent,
    ConfirmationModalComponent,
    SearchBarComponent,
    UsersListComponent,
    TagsListComponent,
    HelpModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxMasonryModule,
    ApiModule.forRoot({rootUrl: environment.api_root}),
    NgbPopoverModule,
    FormsModule,
    NgbTypeaheadModule,
    NgbToastModule,
    NgbTooltipModule,
    ClipboardModule
  ],
  providers: [
    ApiInterceptor,
    API_INTERCEPTOR_PROVIDER
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
