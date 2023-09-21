import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cuisine } from '../Model.ts/cuisine';
import { Order } from '../Model.ts/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient:HttpClient) { }

  addToCart(cuisine:Cuisine, emailId:any){
    let headers = new HttpHeaders({
      'authorization' : 'Bearer '+localStorage.getItem('token')
    });
    return this.httpClient.post<Cuisine>(`http://localhost:9000/customer/user/cart/${emailId}`,cuisine,{headers});
  }

  getCartItems(emailId:any){
    let headers = new HttpHeaders({
      'authorization' : 'Bearer '+localStorage.getItem('token')
    });
    return this.httpClient.get<Array<Cuisine>>(`http://localhost:9000/customer/user/allCartItem/${emailId}`,{headers});
  }

  setQuantity(emailId:any,cuisine:Cuisine,quantity:any){
    let headers = new HttpHeaders({
      'authorization' : 'Bearer '+localStorage.getItem('token')
    });
    return this.httpClient.put<Array<Cuisine>>(`http://localhost:9000/customer/user/setQuantity/${emailId}/${quantity}`,cuisine,{headers});
  }

  totalBill(emailId:any){
    let headers = new HttpHeaders({
      'authorization' : 'Bearer '+localStorage.getItem('token')
    });
    return this.httpClient.get<any>(`http://localhost:9000/customer/user/bill/${emailId}`,{headers});
  }
  placeOrder(emailId:any,order:Order){
    let headers = new HttpHeaders({
      'authorization' : 'Bearer '+localStorage.getItem('token')
    });
    return this.httpClient.post<Order>(`http://localhost:9000/order/user/addOrder/${emailId}`,order,{headers});
  }

  remove(emailId:any, cuisineId:any){
    let headers = new HttpHeaders({
      'authorization' : 'Bearer '+localStorage.getItem('token')
    });
    return this.httpClient.delete<Array<Cuisine>>(`http://localhost:9000/customer/user/removeFromCart/${emailId}/${cuisineId}`,{headers});
  }
}
