import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CurrentDate } from 'src/app/interfaces/current.interface';
import { CurrencyService } from 'src/app/service/currency.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnDestroy {
  private readonly unsubscribe$: Subject<void> = new Subject();
  currentDate!: CurrentDate

  constructor(private currencyService: CurrencyService) {
    this.getHeaderDate()
  }

  getHeaderDate() {
    this.currencyService.getAllCurrency("UAH")
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((data: CurrentDate) => {
      this.currentDate = data
    })
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
