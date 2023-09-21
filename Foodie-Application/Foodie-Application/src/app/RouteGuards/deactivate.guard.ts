import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RegistrationComponent } from '../registration/registration.component';

@Injectable({
  providedIn: 'root'
})
export class DeactivateGuard implements CanDeactivate<unknown> {
  canDeactivate(component: RegistrationComponent): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(component.registration==null || !component.registration.valid){
      return window.confirm('Are you want to leave without registration!');
    }
    return true;
  }
  
}
