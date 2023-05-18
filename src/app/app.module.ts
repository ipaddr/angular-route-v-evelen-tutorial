import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router'


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { ServersService } from './servers/servers.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuardService } from './auth-guard.service';
import { AuthService } from './auth.service';
import { ErrorPageComponent } from './error-page/error-page.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent}, // localhost:4200/
  {path: 'users', component: UsersComponent, children: [
    {path: ':id/:name', component: UserComponent}, // localhost:4200/users/id/name
  ]}, // localhost:4200/users
  {path: 'servers', component: ServersComponent, children: [
    {path: ':id', component: ServerComponent}, // localhost:4200/servers
    {path: ':id/edit', component: EditServerComponent}, // localhost:4200/servers
  ]}, // localhost:4200/servers
  {path: 'not-found', component: PageNotFoundComponent},
  {path: '**', redirectTo: '/not-found'}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsersComponent,
    ServersComponent,
    UserComponent,
    EditServerComponent,
    ServerComponent,
    PageNotFoundComponent,
    ErrorPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
  ],
  providers: [ServersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
