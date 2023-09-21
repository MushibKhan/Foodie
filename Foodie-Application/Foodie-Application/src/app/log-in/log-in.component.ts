import { Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Registration } from '../Model.ts/registration';
import { LoginService } from '../Services/login.service';
import { HeaderComponent } from '../header/header.component';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  
  loginForm: FormGroup;

  constructor(private dialog: MatDialog, private formBuilder: FormBuilder, private loginService: LoginService, private myRouter: Router) {
    this.loginForm = this.formBuilder.group({
      emailId: new FormControl('', [Validators.required, Validators.pattern(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)]),
      password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)])
    });
  }

  ngOnInit(): void { }

  onSubmit() {
    console.log(this.loginForm.value);
    let login: Registration = {
      emailId: this.loginForm.get("emailId")?.value,
      password: this.loginForm.get("password")?.value
    }

    this.loginService.checkLogin(login);
  }

}