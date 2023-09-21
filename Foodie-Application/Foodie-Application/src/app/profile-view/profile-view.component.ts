import { Component, OnInit } from '@angular/core';
import { Registration } from '../Model.ts/registration';
import { ProfileService } from '../Services/profile.service';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {

  user:Registration={};

  constructor(private profileService:ProfileService){}

  ngOnInit(): void {
    let emailId = localStorage.getItem('emailId');
    console.log(emailId)
    this.profileService.getUserById(emailId).subscribe({
      next:(data) =>{
        this.user = data;
        console.log(this.user)
      },
      error:(error) =>{
        alert('Something went wrong!');
      }
    })
  }

}
