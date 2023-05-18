import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ServersService } from './servers/servers.service';

interface Server{
 id: number,
 name: string, 
 status: string
}

@Injectable({
  providedIn: 'root'
})
export class ServerResolver implements Resolve<Server> {

  constructor(private serServer: ServersService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Server> {
    return of(this.serServer.getServer(+route.params['id']));
  }
}
