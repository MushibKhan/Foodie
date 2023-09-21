import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../Model.ts/restaurant';
import { VendorService } from '../Services/vendor.service';
import { Cuisine } from '../Model.ts/cuisine';
import { DashboardService } from '../Services/dashboard.service';

@Component({
  selector: 'app-vendor-view',
  templateUrl: './vendor-view.component.html',
  styleUrls: ['./vendor-view.component.css']
})
export class VendorViewComponent implements OnInit {
  restaurant: Restaurant = {};
  cuisines: Cuisine[] = [];
  emailId = localStorage.getItem('emailId');

  constructor(private vendorService: VendorService, private restaurantService: DashboardService) { }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.vendorService.getRestaurant(this.emailId).subscribe({
        next: (data) => {
          this.restaurant = data;
          console.log(this.restaurant);
          this.restaurantService.getCuisine(this.restaurant.restaurantId).subscribe({
            next: (cuisine) => {
              this.cuisines = cuisine;
            }
          });
        },
        error: (error) => {
          alert('You have no restaurant!');
        }
      });

    }
  }

  delete(cuisineId: any) {
    this.vendorService.deleteCuisine(this.emailId, this.restaurant.restaurantId, cuisineId).subscribe({
      next: (data) => {
        this.cuisines = data;
        console.log(this.cuisines);
        alert('Cuisine Deleted Successfully.');
      },
      error: (error) => {
        alert('Cuisine Deletion Failed');
      }

    });
  }

  update(cuisine: Cuisine) {  //why we update cuisine two place?
    this.vendorService.cuisine = cuisine;
    console.log(this.vendorService.cuisine);
    console.log(cuisine);
  }
}
