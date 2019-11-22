import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'src/app/cookie.service';

@Component({
  selector: 'app-product-stock',
  templateUrl: './product-stock.component.html',
  styleUrls: ['./product-stock.component.css']
})
export class ProductStockComponent implements OnInit {

  prodData : any;
  prodCount : number;

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  ngOnInit() {
    this.cookieService.group$.subscribe(data =>{
      this.prodCount = data.length;
    });
  }

}
