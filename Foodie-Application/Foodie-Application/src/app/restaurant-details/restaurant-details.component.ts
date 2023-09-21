import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../Services/dashboard.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Cuisine } from '../Model.ts/cuisine';
import { VendorService } from '../Services/vendor.service';
import { Restaurant } from '../Model.ts/restaurant';
import { OrderService } from '../Services/order.service';

@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.css']
})
export class RestaurantDetailsComponent implements OnInit {

  originalCuisines: Cuisine[] = [];
  restaurant: Restaurant = {};
  search: string = '';
  cuisines :Cuisine[]=[];
  isCustomer = localStorage.getItem('typeOfUser')==='customer';

  constructor(private restaurantService: DashboardService, private router: Router,private activatedRoute: ActivatedRoute, private orderService:OrderService) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      let restaurantId = params.get('restaurantId');
      console.log(restaurantId);
      this.restaurantService.getRestaurantById(restaurantId).subscribe({
        next: (data) => {
          this.restaurant = data;
        },
        error: (error) => {
          alert('Restaurant not found');
        }
      });

      this.restaurantService.getCuisine(restaurantId).subscribe({
        next: (data) => {
          this.originalCuisines = data;
          console.log(this.originalCuisines);
          this.cuisines = this.originalCuisines
        },
        error: (error) => {
          alert('Cannot access the data');
        }
      });
    });
    this.onSearch();
  }

  

  onSearch() {
    if (this.search === '') {
      this.cuisines = this.originalCuisines;
      console.log(this.cuisines);
    } else {
      this.cuisines = this.originalCuisines.filter(cuisine => cuisine.cuisineName?.toLowerCase().includes(this.search.toLowerCase()));
    }
  }

  addToCart(cuisine:Cuisine){
    let emailId= localStorage.getItem('emailId');
    this.orderService.addToCart(cuisine,emailId).subscribe({
      next:(data)=>{
        alert('Cuisine added to cart');
        this.router.navigate(['/cart']);
      },
      error:(error)=>{
        alert('error occured while adding cuisine to cart');
      }
    });
  }
}





