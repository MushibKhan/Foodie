import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../Services/profile.service';
import { Router } from '@angular/router';
import { Registration } from '../Model.ts/registration';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  user:Registration={};
  emailId = localStorage.getItem('emailId');
  
  constructor(private profileService:ProfileService, private myRouter:Router){}
  

  ngOnInit(): void {
    this.profileService.getUserById(this.emailId).subscribe({
      next:(data) => {
       this.user=data;
      },
      error:(error) =>{
        alert('User Not Found!')
      }
    });
  }

  updateProfile(){
    this.profileService.updateProfile(this.emailId,this.user).subscribe({
      next:(data) => {
        alert("Profile Updated");
        this.myRouter.navigate(['/profile']);
      },
      error:(error) => {
        alert('Profile updated Failed!')
      }
    })
  }
}
