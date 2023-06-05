import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CurrentDate } from '../interfaces/current.interface';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  url: string = "https://api.exchangerate.host/latest"
  symbolsFilter: string[] = ["USD","EUR","UAH"]

  constructor(private http: HttpClient) { }

  getAllCurrency(base: string): Observable<CurrentDate> {
    return this.http.get(`${this.url}?base=${base}&symbols=${this.symbolsFilter.join()}`) as Observable<CurrentDate>
  }

}
