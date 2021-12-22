import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private router: Router,private dataService: DataService) {}

  option_mode: any;
  option: any;
  prices: any;
  clean: any;

  goToDateTime() {
    this.router.navigate(['/date-time']);
  }

  goTo(option: any) {
    this.router.navigate(['/date-time'], {
      state: {
        data: {
          option,
        },
      },
    });
  }

  ngOnInit(){

    this.dataService
      .processData('get_price', { option_mode: this.option })
      .subscribe(
        (res: any) => {
          this.prices = res.data;
          localStorage.setItem('prices', JSON.stringify(res.data));
        },
        (error: any) => {
          console.log('ERROR: ', error);
        }
      );

      this.dataService
      .processData('get_payment', { cleaners: this.clean })
      .subscribe(
        (res: any) => {
          this.prices = res.data;
          localStorage.setItem('payment', JSON.stringify(res.data));
        },
        (error: any) => {
          console.log('ERROR: ', error);
        }
      );
  }
}
