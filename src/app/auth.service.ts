import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedIn = false;

  constructor() { }

  isAuthenticate(){
    const promise = new Promise(
      (resolve, reject) => {
        setTimeout(
          () => {
           resolve(this.loggedIn) 
          }, 800);
      }
    );
    return promise;
  }

  login(){ this.loggedIn = true;}

  logout(){ this.loggedIn = false;}

}
