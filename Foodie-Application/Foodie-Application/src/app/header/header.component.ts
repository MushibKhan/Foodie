import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { LoginService } from '../Services/login.service';
import { MatDialog } from '@angular/material/dialog';
import { ProfileService } from '../Services/profile.service';
import { Registration } from '../Model.ts/registration';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  logInStatus=localStorage.getItem('token');
  isVendor = localStorage.getItem('typeOfUser')==='vendor';
  isCustomer = localStorage.getItem('typeOfUser')==='customer';
  emailId=localStorage.getItem('emailId');
  user:Registration={};
  
  constructor(private loginService: LoginService, private profileService: ProfileService) {
  }

  ngOnInit(): void {
   if(this.isCustomer){
    this.profileService.getUserById(this.emailId).subscribe({
      next:(data) => {
       this.user=data;
        
      },
      error:(error) =>{
        alert('User Not Found!')
      }
    });
   }
  }


  logOut() {
    this.loginService.logout();
    alert('logged out!');
  } 
}



