import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  private groupSource = new BehaviorSubject<any>({});
  public group$: Observable<any> = this.groupSource.asObservable();
  selectIndex : number;
  selectedIndex : Subject<any> = new Subject<any>();
  clearRating : Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient) { 
    this.getGroups();
  }

  getGroups(): void {
    this.http.get('http://localhost:3000/products').pipe(map((res) => res))
          .subscribe((groups) => this.groupSource.next(groups));
  }

  public getCookie(name: string) {
    let ca: Array<string> = document.cookie.split(';');
    let caLen: number = ca.length;
    let cookieName = `${name}=`;
    let c: string;

    for (let i: number = 0; i < caLen; i += 1) {
        c = ca[i].replace(/^\s+/g, '');
        if (c.indexOf(cookieName) == 0) {
            return c.substring(cookieName.length, c.length);
        }
    }
    return '';  
  } 

  public setCookie(name: string, value: boolean) {
    document.cookie = `${name}=${value}`;
  }

}
