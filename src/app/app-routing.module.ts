import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ContentWallComponent} from './components/content-wall/content-wall.component';
import {UserPageComponent} from './components/user-page/user-page.component';
import {TagPageComponent} from './components/tag-page/tag-page.component';
import {ContentPageComponent} from './components/content-page/content-page.component';
import {UsersListComponent} from './components/users-list/users-list.component';
import {TagsListComponent} from './components/tags-list/tags-list.component';


const routes: Routes = [
  {path: 'last', component: ContentWallComponent},
  {path: 'user/:user_id', component: UserPageComponent},
  {path: 'users/all', component: UsersListComponent},
  {path: 'tag/:tag_name', component: TagPageComponent},
  {path: 'tags/all', component: TagsListComponent},
  {path: 'archive/:file_id', component: ContentPageComponent},
  {path: '', redirectTo: 'last', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    relativeLinkResolution: 'legacy',
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
