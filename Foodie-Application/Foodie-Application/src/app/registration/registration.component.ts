import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Registration } from '../Model.ts/registration';
import { RegistrationService } from '../Services/registration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
 
  user:Registration={}
  imageFile:any;
  registration:FormGroup;
 
 constructor(private formBuilder:FormBuilder, private registrationService:RegistrationService, private myRouter:Router){
  this.registration=this.formBuilder.group({
    name:new FormControl('',[Validators.required, Validators.pattern(/^[a-zA-Z]{4,20}$/)]),
    emailId:new FormControl('',[Validators.required, Validators.pattern(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)]),
    password:new FormControl('',[Validators.required,Validators.minLength(8), Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)]),
    confirmPassword: new FormControl('',[Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)]),
    image: new FormControl(''),
    typeOfUser:new FormControl(''),
    contactNumber: new FormControl('',[Validators.required, Validators.minLength(10), Validators.pattern(/^[789]\d{9,9}$/)])
  },{validator:[this.passwordValidator]});
  this.registration.patchValue({ typeOfUser:'customer'});
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
  this.user=this.registration.value;
    console.log(this.user);
    console.log(this.registration.value);
    this.registrationService.registration(this.user).subscribe({
      next:(data)=>{
        alert('Registration Succesfull');
        this.myRouter.navigate(['home'])
      },
      error:(error)=>{
        alert('Registration Failure')
      }
    });
}

uploadImage(event: any) {
  this.imageFile = event.target.files[0];
  this.registration.patchValue({ image: "./assets/Wallpapers/"+this.imageFile.name});
}

}
