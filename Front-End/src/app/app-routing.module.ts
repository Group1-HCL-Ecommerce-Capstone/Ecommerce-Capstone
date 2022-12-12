import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from './components/catalog/catalog.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProductCRUDComponent } from './components/product-crud/product-crud.component';
import { UserCRUDComponent } from './components/user-crud/user-crud.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { AddAddressComponent } from './components/add-address/add-address.component';
import { EditAddressComponent } from './components/edit-address/edit-address.component';
import { AddressCrudComponent } from './components/address-crud/address-crud.component';
import { OktaAuthGuard, OktaCallbackComponent } from '@okta/okta-angular';
import { OktaConfigComponent } from './config/okta-config/okta-config.component';
import { CartComponent } from './components/cart/cart.component';
import { OrdersComponent } from './components/orders/orders.component';
import { OrdersCrudComponent } from './components/orders-crud/orders-crud.component';
import { OrdersEditStatusComponent } from './components/orders-edit-status/orders-edit-status.component';
import { CheckoutComponent } from './components/checkout/checkout.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'catalog', component: CatalogComponent },
  { path: 'cart', component: CartComponent },
  { path: 'profile', component: ProfileComponent},
  { path: 'profile/list', component: AddressCrudComponent },
  { path: 'profile/add', component: AddAddressComponent },
  { path: 'profile/edit', component: EditAddressComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'login', component: LoginComponent},
  { path: 'login/callback', component: OktaCallbackComponent},
  { path: 'okta', component: OktaConfigComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'manage/users', component: UserCRUDComponent},
  { path: 'manage/users/add', component: AddUserComponent},
  { path: 'manage/users/edit', component: EditUserComponent},
  { path: 'manage/products', component: ProductCRUDComponent},
  { path: 'manage/products/add', component: AddProductComponent},
  { path: 'manage/products/edit', component: EditProductComponent},
  { path: 'manage/orders', component: OrdersCrudComponent},
  { path: 'manage/orders/status', component: OrdersEditStatusComponent},
  { path: '**', component: PageNotFoundComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

/*
 *
 *USING AUTH GUARD FOR ADMIN
 *
 *{ //these are the admin protected routes
    path: 'manage/users',
    component: UserCRUDComponent,
    canActivate: [ OktaAuthGuard ],
    canActivateChild: [ OktaAuthGuard],
    children: [
      { path: 'manage/users/add', component: AddUserComponent},
      { path: 'manage/users/edit', component: EditUserComponent},
      { path: 'manage/products', component: ProductCRUDComponent},
      { path: 'manage/products/add', component: AddProductComponent},
      { path: 'manage/products/edit', component: EditProductComponent}
    ]
  },
 *
 */
