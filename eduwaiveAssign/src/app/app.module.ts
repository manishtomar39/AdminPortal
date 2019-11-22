import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './Products/product-list/product-list.component';
import { ProductStockComponent } from './Products/product-stock/product-stock.component';
import { ProductDetailComponent } from './Products/product-detail/product-detail.component';
import { ProductRatingComponent } from './Products/product-rating/product-rating.component';
import { CookieService } from './cookie.service';
import { ProductComponent } from './product/product.component';
import { LoginComponent } from './login/login.component'; 
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent, 
    ProductListComponent,
    ProductStockComponent,
    ProductDetailComponent,
    ProductRatingComponent,
    ProductComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
