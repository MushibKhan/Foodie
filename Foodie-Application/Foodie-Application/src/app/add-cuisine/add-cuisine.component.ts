import { Component, OnInit } from '@angular/core';
import { Cuisine } from '../Model.ts/cuisine';
import { VendorService } from '../Services/vendor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivateGuard } from '../RouteGuards/activate.guard';

@Component({
  selector: 'app-add-cuisine',
  templateUrl: './add-cuisine.component.html',
  styleUrls: ['./add-cuisine.component.css']
})
export class AddCuisineComponent implements OnInit {

  cuisine: Cuisine = {};
  imageFile: any;


  constructor(private vendorService: VendorService, private myRouter: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }

  addCuisine() {
    let emaiId = localStorage.getItem('emailId');
    this.activatedRoute.paramMap.subscribe((params) => {
      let restaurantId = params.get('id');
      console.log(restaurantId);

      this.vendorService.addCuisine(emaiId, restaurantId, this.cuisine).subscribe({
        next: (data) => {
          alert('Cuisine added Succesfully!');
          this.myRouter.navigate(['/vendor']);
        },
        error: (error) => {
          alert('error occured Cuisine Already exist');
        }
      })
    });
  }

  uploadImage(event: any) {
    this.imageFile = event.target.files[0];
    this.cuisine.cuisineImage = "./assets/Cuisine/" + this.imageFile.name;
  }
}
