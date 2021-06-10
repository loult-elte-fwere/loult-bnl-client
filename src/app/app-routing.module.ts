import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ContentWallComponent} from './components/content-wall/content-wall.component';


const routes: Routes = [
  {path: 'last', component: ContentWallComponent},
  {path: '', redirectTo: 'last', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
