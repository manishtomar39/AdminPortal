import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { LoginComponent } from './login/login.component';
import { CookieService } from './cookie.service'

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'product', component: ProductComponent},
  {path: '',   redirectTo: '/login', pathMatch: 'full'},
  {path: '**', component: LoginComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  constructor(private cookieService : CookieService){
    var nav = this.cookieService.getCookie('product');
  }
}
export const routingComponents = [ProductComponent,LoginComponent];
