import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CanComponentDeactivate, CanDeactivateGuardService } from 'src/app/can-deactivate-guard.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanDeactivateGuardService {
  server: {id: number, name: string, status: string};
  private serverId: number;
  serverName = '';
  serverStatus = '';
  isEditable: boolean = false;
  changeStatus: boolean = false;

  constructor(private serversService: ServersService, 
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    
    // this.server = this.serversService.getServer(1);
    this.serverId = +this.route.snapshot.params['id'];

    if(this.serverId !== undefined)
      this.server = this.serversService.getServer(this.serverId);
    
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;

    this.route.params.subscribe(
      (params) => {
        this.server = this.serversService.getServer(+params['id']);
        this.serverName = this.server.name;
        this.serverStatus = this.server.status;
      }
    );

    this.route.queryParams.subscribe(
      (params) => {
        let editable = params['editable'];
        this.isEditable = editable == '1' ? true : false
      }
    );
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
  }

  canDeactivate(component: CanComponentDeactivate, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(!this.isEditable) return true;
    if(this.serverName !== this.server.name || this.serverStatus !== this.server.status 
      && !this.changeStatus){
        return confirm('Do you sure to navigate away?')
      }
      else return false;
  }

}
