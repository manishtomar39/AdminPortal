import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { CookieService } from 'src/app/cookie.service';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-product-rating',
  templateUrl: './product-rating.component.html',
  styleUrls: ['./product-rating.component.css']
})
export class ProductRatingComponent implements OnInit {

  @Output() ratingChanged: EventEmitter<any> = new EventEmitter<any>();
  selectedIndex: any;
  ratings : any;
  ratingValue : any;

  constructor(private cookieService: CookieService, private http: HttpClient) { 
    this.selectedIndex =  this.cookieService.selectedIndex.subscribe(data => {
      this.selectedIndex = data;
      this.getTableData(this.selectedIndex);
    });
  }

  ngOnInit() {
    var clearRating;
    this.cookieService.clearRating.subscribe(data=> {
      clearRating = data;
      if(clearRating){
        (<HTMLInputElement>document.getElementById('ratings')).value='';
      }
    });
  }

  getTableData(indexvalue){
    this.cookieService.group$.subscribe(data => {
      var pData = data;
      if(pData[indexvalue] !== undefined && pData[indexvalue] !== null){
        this.ratings = pData[indexvalue].rating;
        this.ratingChanged.emit(this.ratings);
      }
    });
  }

  changeRating(ratingValue){
    this.ratingChanged.emit(ratingValue);
  }

}
