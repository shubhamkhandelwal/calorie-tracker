import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  showSpinner = false;

  constructor() { }

  show() {
    this.showSpinner = true;
    return this.showSpinner;
  }

  hide() {
    this.showSpinner = false;
    return this.showSpinner;
  }
}
