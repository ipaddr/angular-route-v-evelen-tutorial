import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'

import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuardService } from './auth-guard.service';
import { CanDeactivateGuardService } from './can-deactivate-guard.service';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ServerResolver } from './server.resolver';

const appRoutes: Routes = [
  {path: '', component: HomeComponent}, // localhost:4200/
  {path: 'users', component: UsersComponent, children: [
    {path: ':id/:name', component: UserComponent}, // localhost:4200/users/id/name
  ]}, // localhost:4200/users
  {path: 'servers', component: ServersComponent, canActivate: [AuthGuardService], children: [
    {path: ':id', component: ServerComponent, resolve: {server: ServerResolver}}, // localhost:4200/servers
    {path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuardService]}, // localhost:4200/servers
  ]}, // localhost:4200/servers
//   {path: 'not-found', component: PageNotFoundComponent},
  {path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found ajah'}},
  {path: '**', redirectTo: '/not-found'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
