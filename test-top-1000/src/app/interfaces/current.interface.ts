import { FormControl } from "@angular/forms";

export interface CurrentDate {
  base: string;
  date: Date;
  motd: {
    msg: string;
    url: string;
  };
  rates: Rates;
}

interface Rates {
  [x: string]: any;
  USD: number
  UAH: number
  EUR: number
}

export interface CarrencyForm {
  count: FormControl
  select: FormControl
}

