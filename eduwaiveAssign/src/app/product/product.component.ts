import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from '../cookie.service'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  imgUrl = '/assets/images/icons8-logout-rounded-left-16.png';
  constructor(private router:Router, private cookieService : CookieService) { }

  ngOnInit() {
  }

  onLogout(){
    this.cookieService.setCookie('product',false);
    this.router.navigate(['/login']);

  }

}
