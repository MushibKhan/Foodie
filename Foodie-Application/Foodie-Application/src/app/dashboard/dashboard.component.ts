import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../Model.ts/restaurant';
import { DashboardService } from '../Services/dashboard.service';
import { Router } from '@angular/router';
import { LoginService } from '../Services/login.service';
import { ConnectionPositionPair } from '@angular/cdk/overlay';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  restaurants:Restaurant [] = [];
  isCustomer = localStorage.getItem('typeOfUser')==='customer';
  location:string=''

  constructor(private dashboardService:DashboardService, private myRouter:Router, private loginService:LoginService){
  }

  ngOnInit(): void {
    this.dashboardService.getRestaurants().subscribe({
      next:(data) =>{
        this.restaurants = data;
      },
      error:(error) =>{
        alert('Something went wrong!')
      }
    });
  }

  restroDetails(restaurantId:any){
    this.myRouter.navigate(['/restro/'+restaurantId])
  }

  addFavorite(restaurant:Restaurant){
    let emailId = localStorage.getItem('emailId');
    // console.log(emailId);
    // console.log(restaurant);
    this.dashboardService.addToFavorite(emailId,restaurant).subscribe({
      next:(data)=>{
        alert('Restaurant added to favorite');
      },
      error:(error)=>{
        alert('Restaurant not added to favorite');
      }
    });
  }

  onLocationChange(event:Event) {
    const target = event.target as HTMLSelectElement;
    const location = target?.value;
    console.log('Selected location:', location);
    // Call other methods or perform other actions based on the selected location
    this.dashboardService.getRestaurantByLocation(location).subscribe({
      next:(data)=>{
        this.restaurants=data;
      },
      error:(error)=>{
        alert("There are no restaurants present on your location !");
        
      }
    });
  }
}
