import { Component, OnInit, Input } from '@angular/core';
import { CookieService } from 'src/app/cookie.service';
import { Subject } from 'rxjs';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  selectedIndex: any;
  pData : any;
  prodModal : any;
  prodPrice : any;
  ratingChangeValue : any;
  productObj:Object = {};
  prodId: any;
  dataUrl = 'http://localhost:3000/products';
  productId: any;
  pModalInitialData = [];
  prodModId : any;
  constructor(private cookieService: CookieService, private http: HttpClient){ 
    this.cookieService.group$.subscribe(data => {
      this.pData = data;
      this.prodId = this.pData.length+1;
      for(let i=0; i < this.pData.length; i++){
        if(!this.pModalInitialData.includes(this.pData[i].modal)){
          this.pModalInitialData.push(this.pData[i].modal);
        }
      }
    });
    this.selectedIndex =  this.cookieService.selectedIndex.subscribe(data => {
      this.selectedIndex = data;
      if(this.selectedIndex !== null && this.selectedIndex !== undefined && this.selectedIndex !== ''){
        this.getTableData(this.selectedIndex);
      }
    }); 
  }

  ngOnInit() {
  }

  getTableData(indexvalue){
    this.cookieService.group$.subscribe(data => {
      var pData = data;
      if(pData[indexvalue] !== undefined && pData[indexvalue] !== null){
        this.productId = pData[indexvalue].id;
        this.prodModal = pData[indexvalue].modal;
        this.prodPrice =  pData[indexvalue].price.substring(1);
        if(this.productId !== undefined && this.productId !== null && this.productId !== ''){
          this.prodModId = this.prodModal + ' ( Product ID - ' + this.productId + ')';
        }
      }
    });
  }

  ratingChanged(value){ 
    this.ratingChangeValue = value;
  }

  addData(prodModal, prodPrice){
    var modalData = []; 
    var prodId : any;
    this.cookieService.group$.subscribe(data => {
      var data = data;
      prodId = data[data.length-1].id+1;
      for(let i=0; i<data.length; i++){
        modalData.push(data[i].modal);
      }
    });
    if(modalData.includes(prodModal)){
      alert("Modal already exists !!! Try to add another modal");
    }
    else{
      this.productObj = {'id':prodId,'modal':prodModal,'price':"$"+prodPrice,'rating':this.ratingChangeValue};
      this.http.post(this.dataUrl, this.productObj).subscribe( data=>{
        this.prodId++;
        this.cookieService.getGroups();
      });
    }
  }

  saveData(prodModal, prodPrice){
    var dataURL = this.dataUrl+"/"+(this.productId);
    this.productObj = {'id':this.productId,'modal':prodModal,'price':"$"+prodPrice,'rating':this.ratingChangeValue};
      this.http.put(dataURL, this.productObj).subscribe( data=>{
        this.cookieService.getGroups();
      });
  }

  deleteData(){
    var dataURL = this.dataUrl+"/"+(this.productId);
    this.http.delete(dataURL,this.productId).subscribe(data=> {
      this.cookieService.getGroups();
    })
  }

  cancelData(){
    (<HTMLInputElement>document.getElementById('prodModal')).value='';
    (<HTMLInputElement>document.getElementById('prodPrice')).value='';
    this.cookieService.clearRating.next(true);
  }

}
