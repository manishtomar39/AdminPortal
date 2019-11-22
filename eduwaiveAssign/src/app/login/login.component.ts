import { Component, OnInit } from '@angular/core';
import { CookieService } from '../cookie.service'
import { Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  emailError = false;
  passError = false;
  checkValue : boolean ; 
  submitForm = false ; 
  productPage = false;

  
  constructor( private cookieService : CookieService, private router : Router){
  }

  ngOnInit(){
    if(this.cookieService.getCookie('product') === 'true'){
      this.productPage = JSON.parse(this.cookieService.getCookie('product'));
    }
  }

  onSubmit(email, password){
    var reEmail = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$");
    var rePassword =  new RegExp("[A-Za-z]{4,20}");
    if (reEmail.test(email)) {
      this.emailError = false;
    }
    else{
      this.emailError = true;
    }
    if(rePassword.test(password)) {
      this.passError = false;
    }
    else{
      this.passError = true;
    }  

    if(this.passError === false && this.emailError === false){
      this.submitForm = true;
    }
    if(this.submitForm === true || this.productPage === true){
      this.router.navigate(['/product']);
    }
  }

  toggleVisibility(e){
    this.checkValue= e.target.checked;
    this.cookieService.setCookie('product', this.checkValue);
  }
}
