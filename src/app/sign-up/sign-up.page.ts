import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  email: any;
  password: any;
  uname: any;
  fname: any;
  lname: any;
  contact: any;

  constructor(
    private router: Router,
    private dataService: DataService,
    public toastController: ToastController
  ) {}

  ngOnInit() {}

  register() {
    let data = {
      user_email: this.email,
      user_password: this.password,
      user_fname: this.fname,
      user_lname: this.lname,
      user_uname: this.uname,
      user_contact_no: this.contact,
    };

    this.dataService.processData('register', data).subscribe(
      (res: any) => {
        if (res.msg == 'Successfully Registered') {
          this.presentToast(res.msg);
          this.router.navigate(['sign-in']);
        } else {
          this.presentToast(res.msg);
        }
      },
      (error: any) => {
        this.presentToast('Invalid inputs try again');
        console.log('ERROR: ', error);
      }
    );
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1000,
    });
    toast.present();
  }
}
