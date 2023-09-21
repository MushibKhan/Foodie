import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../Model.ts/restaurant';
import { VendorService } from '../Services/vendor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrls: ['./add-restaurant.component.css']
})
export class AddRestaurantComponent implements OnInit{

  restaurant:Restaurant={}
  imageFile:any;

  constructor(private vendorService:VendorService, private myRouter:Router){}
  
  ngOnInit(): void {
  }

  addRestaurant(){
    let emailId= localStorage.getItem('emailId');
    this.vendorService.addRestaurant(emailId,this.restaurant).subscribe({
      next:(data)=>{
        alert('Restaurant added Succesfully!');
        console.log(this.restaurant);
        this.myRouter.navigate(['/vendor'])
      },
      error:(error)=>{
        alert('Error occured while adding the restaurant');
      }
    });
  }

  uploadImage(event:any){
      this.imageFile = event.target.files[0];
      this.restaurant.restaurantImage = "./assets/Restro/"+this.imageFile.name;
  }

  onLocationChange(event:Event) {
    const target = event.target as HTMLSelectElement;
    const location = target?.value;
    console.log('Selected location:', location);
    this.restaurant.restaurantLocation=location;
    console.log(this.restaurant.restaurantLocation);
  }

}
