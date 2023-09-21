import { Injectable } from '@angular/core';
import { Login } from '../Model.ts/login';
import { HttpClient } from '@angular/common/http';
import { Registration } from '../Model.ts/registration';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  URL: string = 'http://localhost:9000/userAuth/login'

  isLoggedIn = new BehaviorSubject(false);


  constructor(private httpClient: HttpClient, private myRouter: Router) { }

  checkLogin(login: Registration) {
    this.httpClient.post(this.URL, login).subscribe({
      next: (data: any) => {
        console.log(data)
        localStorage.setItem("token", data.token);
        localStorage.setItem("emailId", data.emailId);
        localStorage.setItem("typeOfUser", data.typeOfUser);
        if (data != null) {
          this.isLoggedIn.next(true);
          console.log("login Service" + this.isLoggedIn)

          alert('LogIn Successfull')
          if (localStorage.getItem('typeOfUser') === 'vendor') {
            this.myRouter.navigate(['home']);
          } 
          else {
            this.myRouter.navigate(['dashboard']);
          }
        }
      },
      error: (error) => {
        alert("Username and Password does not match");
      }

    });
  }

  logout() {
    localStorage.clear();
    // this.isLoggedIn = false;
    this.isLoggedIn.next(false);
    this.myRouter.navigate(['/home']);
  }
}
