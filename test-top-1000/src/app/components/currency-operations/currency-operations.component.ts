import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  CarrencyForm,
  CurrentDate,
} from 'src/app/interfaces/current.interface';
import { CurrencyService } from 'src/app/service/currency.service';

@Component({
  selector: 'app-currency-operations',
  templateUrl: './currency-operations.component.html',
  styleUrls: ['./currency-operations.component.scss'],
})
export class CurrencyOperationsComponent implements OnDestroy {
  private readonly unsubscribe$: Subject<void> = new Subject();
  currentDate!: CurrentDate;
  formGroupFirst!: FormGroup<CarrencyForm>;
  formGroupSecond!: FormGroup<CarrencyForm>;
  base: string = 'USD';

  constructor(
    private currencyService: CurrencyService,
    private fb: FormBuilder
  ) {
    this.getHeaderDate();
  }

  addBorder(wrap: HTMLElement[]) {
    wrap.forEach((el) => {
      el.classList.add('bordered');
    });
  }

  removeBorder(wrap: HTMLElement[]) {
    wrap.forEach((el) => {
      el.classList.remove('bordered');
    });
  }

  createForm() {
    this.formGroupFirst = this.fb.group({
      count: new FormControl(1),
      select: new FormControl(this.base),
    });
    this.formGroupSecond = this.fb.group({
      count: new FormControl(this.currentDate.rates.UAH.toFixed(2)),
      select: new FormControl('UAH'),
    });
  }

  getHeaderDate() {
    this.currencyService
      .getAllCurrency(this.base)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: CurrentDate) => {
        this.currentDate = data;
        this.createForm();
      });
  }

  changeCurrency(
    event: FormControl,
    change: FormControl,
    eventSelect: FormControl,
    changeSelect: FormControl
  ) {
    this.currencyService
      .getAllCurrency(eventSelect.value)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        Object.keys(data.rates).forEach((key) => {
          const term = event.value * data.rates[key];
          key === changeSelect.value ? change.setValue(term.toFixed(2)) : null;
        });
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
