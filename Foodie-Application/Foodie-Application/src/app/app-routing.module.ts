import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { LogInComponent } from './log-in/log-in.component';
import { DeactivateGuard } from './RouteGuards/deactivate.guard';
import { ProfileService } from './Services/profile.service';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RestaurantDetailsComponent } from './restaurant-details/restaurant-details.component';
import { FavoriteViewComponent } from './favorite-view/favorite-view.component';
import { VendorViewComponent } from './vendor-view/vendor-view.component';
import { AddRestaurantComponent } from './add-restaurant/add-restaurant.component';
import { UpdateRestaurantComponent } from './update-restaurant/update-restaurant.component';
import { AddCuisineComponent } from './add-cuisine/add-cuisine.component';
import { UpdateCuisineComponent } from './update-cuisine/update-cuisine.component';
import { RegisterVendorComponent } from './register-vendor/register-vendor.component';
import { HomePageComponent } from './home-page/home-page.component';
import { OrderCartComponent } from './order-cart/order-cart.component';
import { AddAddressComponent } from './add-address/add-address.component';


const routes: Routes = [
  {path:'register', component:RegistrationComponent,canDeactivate:[DeactivateGuard]},
  {path:'login', component:LogInComponent},
  {path:'profile', component:ProfileViewComponent},
  {path: 'edit',component:EditProfileComponent},
  {path:'dashboard',component:DashboardComponent},
  {path :'restro/:restaurantId',component:RestaurantDetailsComponent},
  {path: 'favorite', component:FavoriteViewComponent},
  {path:'vendor', component:VendorViewComponent},
  {path:'addRestaurant', component:AddRestaurantComponent},
  {path:'updateRestaurant', component:UpdateRestaurantComponent},
  {path:'addCuisine/:id', component:AddCuisineComponent},
  {path:'updateCuisine/:id', component:UpdateCuisineComponent},
  {path:'registerVendor', component:RegisterVendorComponent},
  {path:'home',component:HomePageComponent},
  {path:'',component:HomePageComponent},
  {path:'cart',component:OrderCartComponent},
  {path:'addAddress', component:AddAddressComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
