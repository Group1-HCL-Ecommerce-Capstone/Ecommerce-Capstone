import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatBadgeModule} from '@angular/material/badge';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';

import { HomeComponent } from './components/home/home.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserRegService } from './services/userReg.service';
import { ProductCRUDComponent } from './components/product-crud/product-crud.component';
import { UserCRUDComponent } from './components/user-crud/user-crud.component';
import { CartService } from './services/cart.service';
import { AddUserComponent } from './components/add-user/add-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { AddAddressComponent } from './components/add-address/add-address.component';
import { EditAddressComponent } from './components/edit-address/edit-address.component';
import { AddressCrudComponent } from './components/address-crud/address-crud.component';
//import { OktaConfigComponent } from './config/okta-config/okta-config.component';
import { OktaAuthModule, OKTA_CONFIG } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { AuthInterceptor } from './services/auth.interceptor';
import { CartSidenavComponent } from './components/cart-sidenav/cart-sidenav.component';
import { SidenavService } from './services/sidenav.service';
import { CartComponent } from './components/cart/cart.component';
import { OrdersComponent } from './components/orders/orders.component';
import { OrdersCrudComponent } from './components/orders-crud/orders-crud.component';
import { OrdersEditStatusComponent } from './components/orders-edit-status/orders-edit-status.component';
import { MatSelectModule } from '@angular/material/select';
import { CheckoutComponent } from './components/checkout/checkout.component';

const oktaAuth = new OktaAuth({
  //client id given by okta
  clientId: '0oa7fxszif3FkGsQM5d7',
  //okta domain, if not given in application it is in your okta url
  issuer: 'https://dev-84185932.okta.com/oauth2/default',
  redirectUri: 'http://localhost:4200/login/callback',
  scopes: ['openid', 'profile', 'email', 'address']
})

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CatalogComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    ProductCRUDComponent,
    UserCRUDComponent,
    AddUserComponent,
    EditUserComponent,
    AddProductComponent,
    EditProductComponent,
    AddAddressComponent,
    EditAddressComponent,
    AddressCrudComponent,
    CartSidenavComponent,
    CartComponent,
    OrdersComponent,
    OrdersCrudComponent,
    OrdersEditStatusComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatToolbarModule,
    HttpClientModule,
    MatFormFieldModule,
    MatCardModule,
    MatGridListModule,
    MatTableModule,
    MatInputModule,
    MatSidenavModule,
    MatBadgeModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    OktaAuthModule,
    MatExpansionModule,
    MatMenuModule,
    MatSelectModule
    ],
  providers: [
    UserRegService, 
    CartService, 
    CatalogComponent, 
    SidenavService,
    {provide: OKTA_CONFIG, useValue: { oktaAuth }},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  currentUser: any;
}

