import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Registration } from '../Model.ts/registration';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {


  URL:string="http://localhost:9000/customer/register"
  constructor(private httpClient:HttpClient) { }

  registration(registration:Registration){
    return this.httpClient.post<Registration>(this.URL,registration);
  }
}
