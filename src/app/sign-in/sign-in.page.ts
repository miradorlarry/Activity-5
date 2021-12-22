import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { DataService } from '../services/data.service';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  uname: any;
  password: any;
  user: any;
  user_obj: any;

  constructor(
    private router: Router,
    private dataService: DataService,
    public toastController: ToastController
  ) {}

  goToProfile() {
    this.router.navigate(['/tablinks']);
  }
  ngOnInit() {

  }

  login() {
    let data = {
      user_uname: this.uname,
      user_password: this.password,
    };


    this.dataService.processData('login', data).subscribe(
      (res: any) => {
        if (res.data) {
          localStorage.setItem('currentUser', JSON.stringify(res.data));
          this.presentToast('Successfully Logged in');
          this.router.navigate(['/tablinks']);
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
