import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Registration } from '../Model.ts/registration';
import { LoginService } from '../Services/login.service';
import { VendorService } from '../Services/vendor.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit{

  hasRestaurant = false;

  isLogged= localStorage.getItem('token');
  isVendor=localStorage.getItem("typeOfUser")==='vendor';
  emailId=localStorage.getItem('emailId');
  
  constructor(private loginService: LoginService, private vendorService:VendorService, private myRouter:Router){}
  ngOnInit(): void {
   if(this.isVendor){
      // check if the vendor has a restaurant using a service method
      this.vendorService.getRestaurant(this.emailId).subscribe(
     (restaurant) => {
       // if the vendor has a restaurant, set hasRestaurant to true
       this.hasRestaurant = true;
     },
     (error) => {
       // if the vendor doesn't have a restaurant, set hasRestaurant to false
       this.hasRestaurant = false;
     }
   );
   }
  }

  logOut() {
    this.loginService.logout();
    alert('logged out!');
  }
  
}
