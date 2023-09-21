import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../Model.ts/restaurant';
import { DashboardService } from '../Services/dashboard.service';
import { LoginService } from '../Services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorite-view',
  templateUrl: './favorite-view.component.html',
  styleUrls: ['./favorite-view.component.css']
})
export class FavoriteViewComponent implements OnInit {


  restaurants: Restaurant[] = [];
  emailId = localStorage.getItem('emailId');

  constructor(private restaurantService: DashboardService, private loginService: LoginService, private myRouter: Router) { }

  ngOnInit(): void {
    this.restaurantService.getFavorite(this.emailId).subscribe({
      next: (data) => {
        this.restaurants = data;
      },
      error: (error) => {
        alert('Error occured while accesing data');
      }
    });
  }

  restroDetails(restaurantId: any) {
    this.myRouter.navigate(['/restro/' + restaurantId])
  }

  deleteFavorite(restaurantId: any) {
    this.restaurantService.deleteFromFavorite(this.emailId, restaurantId).subscribe({
      next: (data) => {
        alert('Restaurant removed from favorite');
        this.restaurants = data;
      },
      error: (error) => {
        alert('Error occured while removing the restaurant');
      }
    });
  }


}
