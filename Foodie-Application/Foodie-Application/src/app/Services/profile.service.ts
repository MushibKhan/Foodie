import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Registration } from '../Model.ts/registration';
import { Address } from '../Model.ts/address';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private httpCleint:HttpClient) { }

  getUserById(emailId:any){
    let headers = new HttpHeaders({
      'authorization' : 'Bearer '+localStorage.getItem('token')
    });
    return this.httpCleint.get<Registration>(`http://localhost:9000/customer/user/customerById/${emailId}`,{headers});
  }

  updateProfile(emailId:any,registration:Registration){
    let headers = new HttpHeaders({
      'authorization' : 'Bearer '+localStorage.getItem('token')
    });
    return this.httpCleint.put<Registration>(`http://localhost:9000/customer/user/update/${emailId}`,registration,{headers});
  }

  addAddress(emailId:any, address:Address){
    let headers = new HttpHeaders({
      'authorization' : 'Bearer '+localStorage.getItem('token')
    });
    return this.httpCleint.post<Address>(`http://localhost:9000/customer/user/addAddress/${emailId}`,address,{headers});
  }

  getAddress(emailId:any){
    let headers = new HttpHeaders({
      'authorization' : 'Bearer '+localStorage.getItem('token')
    });
    return this.httpCleint.get<Array<Address>>(`http://localhost:9000/customer/user/getAddress/${emailId}`,{headers});
  }
}
