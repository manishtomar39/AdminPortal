import { Component, OnInit, ChangeDetectionStrategy, Input  } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'src/app/cookie.service';
import {ChangeDetectorRef} from '@angular/core'


@Component({
  selector: 'app-product-detail',
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  selectedIndex: any;
  pData : any;
  prodList = [];
  prodPrice = [];

  constructor(private http: HttpClient, private cookieService: CookieService, private ref: ChangeDetectorRef) {
  }

  ngOnInit() {   
    this.cookieService.group$.subscribe(data => {
      this.prodList = [];
      this.prodPrice = [];
      this.pData = data;
      for(let i=0; i< this.pData.length; i++){
        if(!this.prodList.includes(this.pData[i].modal)){
          this.prodList.push(this.pData[i].modal);
          this.prodPrice.push(this.pData[i].price);
          this.ref.detectChanges();
        }
      }
    });
  }

  tableData(event){
    for(let i = 0; i<this.pData.length; i++){
      if(this.pData[i].modal === event){
        this.cookieService.selectedIndex.next(i);
      }
    }
  }

}
