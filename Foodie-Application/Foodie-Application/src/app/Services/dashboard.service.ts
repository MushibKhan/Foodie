import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Restaurant } from '../Model.ts/restaurant';
import { Cuisine } from '../Model.ts/cuisine';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  
  constructor(private httpCleint : HttpClient) { }

  getRestaurants(){
    return this.httpCleint.get<Array<Restaurant>>(`http://localhost:9000/restaurant/allRestro`);
  }
  

  getCuisine(restaurantId:any){
    return this.httpCleint.get<Array<Cuisine>>(`http://localhost:9000/restaurant/allCuisine/${restaurantId}`);
  }

  addToFavorite(emailId:any,restaurant:Restaurant){
    let headers = new HttpHeaders({
      'authorization' : 'Bearer '+localStorage.getItem('token')
    });
    return this.httpCleint.post<Restaurant>(`http://localhost:9000/customer/user/addRestro/${emailId}`,restaurant,{headers});
  }

  getFavorite(emailId:any){
    let headers = new HttpHeaders({
      'authorization' : 'Bearer '+localStorage.getItem('token')
    });
    return this.httpCleint.get<Array<Restaurant>>(`http://localhost:9000/customer/user/allRestro/${emailId}`,{headers})
  }

  deleteFromFavorite(emailId:any,restaurantId:any){
    let headers = new HttpHeaders({
      'authorization' : 'Bearer '+localStorage.getItem('token')
    });
    return this.httpCleint.delete<Array<Restaurant>>(`http://localhost:9000/customer/user/deleteRestro/${emailId}/${restaurantId}`,{headers})
  }

  getRestaurantById(restaurantId:any){
    return this.httpCleint.get<Restaurant>(`http://localhost:9000/restaurant/getRestaurant/${restaurantId}`);
  }

  getRestaurantByLocation(city:any){
    return this.httpCleint.get<Array<Restaurant>>(`http://localhost:9000/restaurant/location/${city}`);
  }
}
