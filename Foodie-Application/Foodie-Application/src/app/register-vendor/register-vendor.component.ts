import { Component, OnInit } from '@angular/core';
import { Vendor } from '../Model.ts/vendor';
import { VendorService } from '../Services/vendor.service';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-vendor',
  templateUrl: './register-vendor.component.html',
  styleUrls: ['./register-vendor.component.css']
})
export class RegisterVendorComponent implements OnInit{
  vendor:Vendor={}
  imageFile:any;
  registration:FormGroup;


  constructor(private vendorService:VendorService, private myRouter:Router, private formBuilder:FormBuilder){
    this.registration=this.formBuilder.group({
      name:new FormControl('',[Validators.required, Validators.pattern(/^[a-zA-Z]{4,20}$/)]),
      emailId:new FormControl('',[Validators.required, Validators.pattern(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)]),
      password:new FormControl('',[Validators.required,Validators.minLength(8), Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)]),
      confirmPassword: new FormControl('',[Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)]),
      image: new FormControl(''),
      typeOfUser:new FormControl(''),
      contactNumber: new FormControl('',[Validators.required, Validators.minLength(10), Validators.pattern(/^[789]\d{9,9}$/)])
    },{validator:[this.passwordValidator]});
    this.registration.patchValue({ typeOfUser:'vendor'});
  }

  ngOnInit(): void {
  }

  passwordValidator(control:AbstractControl){
    const password=control.get('password')?.value;
    const confirmPassword=control.get('confirmPassword')?.value;

    if(!password || !confirmPassword){
      return null;
    }

    if (password != confirmPassword){
      return {passwordShouldMatch:false};
    }
    return null;
  }
 
  onSubmit(){
    this.vendor=this.registration.value;
      console.log(this.vendor);
      console.log(this.registration.value);
      this.vendorService.registerVendor(this.vendor).subscribe({
        next:(data)=>{
          alert('Registration Succesfull');
          this.myRouter.navigate(['/login']);
        },
        error:(error)=>{
          alert('Registration Failure')
        }
      });
  }


    uploadImage(event: any) {
      this.imageFile = event.target.files[0];
      this.registration.patchValue({ image: "./assets/Wallpapers/"+this.imageFile.name });
    }
  }


  



