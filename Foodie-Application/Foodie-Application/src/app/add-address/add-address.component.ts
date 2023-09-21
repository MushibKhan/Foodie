import { Component, OnInit } from '@angular/core';
import { Address } from '../Model.ts/address';
import { OrderService } from '../Services/order.service';
import { ProfileService } from '../Services/profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.css']
})
export class AddAddressComponent implements OnInit{
  
  address:Address={};

  constructor(private profileService:ProfileService, private myRouter:Router){}
  
  ngOnInit(): void {
  }

  addAddress(){
    let emailId= localStorage.getItem('emailId');
    this.profileService.addAddress(emailId,this.address).subscribe({
      next:(data)=>{
        alert('address added succesfully');
        this.myRouter.navigate(['/cart']);
      },
      error:(error)=>{
        alert('Address not Added');
      }
    });
  }

  onLocationChange(event:Event) {
    const target = event.target as HTMLSelectElement;
    const location = target?.value;
    console.log('Selected location:', location);
    this.address.city=location;
    console.log(this.address.city);
  }

}
