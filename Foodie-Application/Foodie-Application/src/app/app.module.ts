import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { LogInComponent } from './log-in/log-in.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatRadioModule} from '@angular/material/radio';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import {MatIconModule} from '@angular/material/icon';
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
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { FooterComponent } from './footer/footer.component';
import { OrderCartComponent } from './order-cart/order-cart.component';
import { AddAddressComponent } from './add-address/add-address.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LogInComponent,
    HeaderComponent,
    ProfileViewComponent,
    EditProfileComponent,
    DashboardComponent,
    RestaurantDetailsComponent,
    FavoriteViewComponent,
    VendorViewComponent,
    AddRestaurantComponent,
    UpdateRestaurantComponent,
    AddCuisineComponent,
    UpdateCuisineComponent,
    RegisterVendorComponent,
    HomePageComponent,
    FooterComponent,
    OrderCartComponent,
    AddAddressComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatInputModule,
    MatCardModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatRadioModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
