import { Component, OnInit } from '@angular/core';
import { Cuisine } from '../Model.ts/cuisine';
import { OrderService } from '../Services/order.service';
import { Address } from '../Model.ts/address';
import { ProfileService } from '../Services/profile.service';
import { Order } from '../Model.ts/order';

@Component({
  selector: 'app-order-cart',
  templateUrl: './order-cart.component.html',
  styleUrls: ['./order-cart.component.css']
})
export class OrderCartComponent implements OnInit {

  cuisines:Cuisine[]=[];
  addresses:Address[]=[];
  totalBill:any;
  order:Order={};
  emailId= localStorage.getItem('emailId');

  constructor(private orderService:OrderService, private profileService:ProfileService){}
  
  ngOnInit(): void {
    this.orderService.getCartItems(this.emailId).subscribe({
      next:(data)=>{
        if (data) {
          this.cuisines = data;
        }
      },
      error:(error)=>{
        console.log('Error occurred while getting cart cuisines:', error);
      }
    });
    this.billing();
 }
 set(event:any,cuisine:Cuisine){
  console.log(event)
   this.orderService.setQuantity(this.emailId,cuisine,event).subscribe({
    next:(data)=>{
      this.cuisines=data;
      console.log(data);
      alert('thankyou')
    }
   })
  }
increaseQuantity(cuisine:Cuisine){
  cuisine.quantity = (cuisine.quantity || 0) + 1;
  this.billing();
  this.set(cuisine.quantity,cuisine);
}
decreaseQuantity(cuisine:Cuisine){
  cuisine.quantity = (cuisine.quantity || 0) - 1;
  this.billing();
  this.set(cuisine.quantity,cuisine);
}
 
  ngAfterContentInit(){
    this.profileService.getAddress(this.emailId).subscribe({
      next:(data)=>{
        if(data){
          this.addresses=data;
        }
      },
      error:(error)=>{
        console.log('Error occurred while getting cart cuisines:', error);
      }
    });
  }

  billing(){
    this.orderService.totalBill(this.emailId).subscribe({
      next:(data)=>{
        this.totalBill=data;
      },
      // error:(error)=>{
      //   alert('Something went wrong during get total bill');
      // }
    });
  }

  placeOrder(){
    this.order.price=this.totalBill;
    this.order.orderedItems=this.cuisines;
    this.orderService.placeOrder(this.emailId,this.order).subscribe({
      next:(data)=>{
        alert('order placed Succesfully');
      },
      error:(error)=>{
        alert('error occured while placing your order');
      }
    });

  }

  remove(cuisineId:any){
    this.orderService.remove(this.emailId,cuisineId).subscribe({
      next:(data)=>{
        this.cuisines=data;
      },
      error:(error)=>{
        alert('error occured while deleting item from cart');
      }
    });

  }

}

