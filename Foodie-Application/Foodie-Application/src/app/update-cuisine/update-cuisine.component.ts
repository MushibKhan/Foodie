import { Component, OnInit } from '@angular/core';
import { Cuisine } from '../Model.ts/cuisine';
import { VendorService } from '../Services/vendor.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-cuisine',
  templateUrl: './update-cuisine.component.html',
  styleUrls: ['./update-cuisine.component.css']
})
export class UpdateCuisineComponent implements OnInit{
  
  cuisine:Cuisine={};
  imageFile:any;

  constructor(private vendorService:VendorService, private activatedRout:ActivatedRoute, private myRouter:Router){}

  ngOnInit(): void {
    this.cuisine=this.vendorService.cuisine;
  }

  updateCuisine(cuisine:Cuisine){
    let emailId= localStorage.getItem('emailId');
    this.activatedRout.paramMap.subscribe((param)=>{
      let restaurantId= param.get('id');
      this.vendorService.updateCuisine(emailId,restaurantId,this.cuisine.cuisineId,cuisine).subscribe({
        next:(data)=>{
          alert('cuisineUpdated');
          this.myRouter.navigate(['/vendor']);
        },
        error:(error)=>{
          alert('error occured while updating cuisine');
        }
      })
    });

  }

  uploadImage(event:any){
    this.imageFile = event.target.files[0];
    this.cuisine.cuisineImage = "./assets/Cuisine/"+this.imageFile.name;
  }

}
