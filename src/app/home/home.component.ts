import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private authSer: AuthService) { }

  ngOnInit() {
  }

  pageToServers(id: number){
    this.router.navigate(['/servers', id, 'edit'], 
    {
      queryParams: {edit: '1'},
      fragment: 'server-section'
    }
    );
  }

  login(){
    this.authSer.login();
  }

  logout(){
    this.authSer.logout();
  }

}
