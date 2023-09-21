import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Vendor } from '../Model.ts/vendor';
import { Restaurant } from '../Model.ts/restaurant';
import { Cuisine } from '../Model.ts/cuisine';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  cuisine:Cuisine={};

  constructor(private httpClient:HttpClient) { }

  getVendorById(emailId:any){
    return this.httpClient.get<Vendor>(`http://localhost:9000/vendor/vendorById/${emailId}`);
  }

  getRestaurant(emailId:any){
    let headers = new HttpHeaders({
      'authorization' : 'Bearer '+localStorage.getItem('token')
    });
    return this.httpClient.get<Restaurant>(`http://localhost:9000/vendor/user/getRestro/${emailId}`,{headers});
  }

  addRestaurant(emailId:any,restaurant:Restaurant){
    let headers = new HttpHeaders({
      'authorization' : 'Bearer '+localStorage.getItem('token')
    });
    return this.httpClient.post<Restaurant>(`http://localhost:9000/vendor/user/addRestro/${emailId}`,restaurant,{headers});
  }

  registerVendor(vendor:Vendor){
    return this.httpClient.post<Vendor>(`http://localhost:9000/vendor/addVendor`,vendor);
  }

  getallVendors(){
    return this.httpClient.get<Array<Vendor>>(`http://localhost:9000/vendor/getAllVendors`);
  }

  addCuisine(emailId:any, restaurantId:any, cuisine:Cuisine){
    let headers = new HttpHeaders({
      'authorization' : 'Bearer '+localStorage.getItem('token')
    });
    return this.httpClient.post<Cuisine>(`http://localhost:9000/vendor/user/addCuisine/${emailId}/${restaurantId}`,cuisine,{headers});
  }

  deleteCuisine(emailId:any, restaurantId:any, cuisineId:any){
    let headers = new HttpHeaders({
      'authorization' : 'Bearer '+localStorage.getItem('token')
    });
    return this.httpClient.delete<Array<Cuisine>>(`http://localhost:9000/vendor/user/deleteCuisine/${emailId}/${restaurantId}/${cuisineId}`,{headers});
  }

  updateCuisine(emailId:any, restaurantId:any, cuisineId:any, cuisine:Cuisine){
    let headers = new HttpHeaders({
      'authorization' : 'Bearer '+localStorage.getItem('token')
    });
    return this.httpClient.put<Cuisine>(`http://localhost:9000/vendor/user/updateCuisine/${emailId}/${restaurantId}/${cuisineId}`, cuisine,{headers});
  }
}
