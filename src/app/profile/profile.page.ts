import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { DataService } from '../services/data.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user_obj: any;
  fname: string = '';
  lname: string = '';
  password: string = '';
  uname: string = '';
  contact: string = '';
  email: string = '';

  constructor(private route:Router, 
    private dataService: DataService,
    public toastController: ToastController
    ) { }

  logout(){
    this.presentToast('Logged Out Successfully');
    this.route.navigate(['sign-in'])
    localStorage.clear();
  }

  goToAbout(){
    this.route.navigate(['/about'])
  }

  ngOnInit() {
    this.user_obj = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.user_obj[0]);
    this.fname = this.user_obj[0].user_fname;
    this.lname = this.user_obj[0].user_lname;
    this.password = this.user_obj[0].user_password;
    this.uname = this.user_obj[0].user_uname;
    this.contact = this.user_obj[0].user_contact_no;
    this.email = this.user_obj[0].user_email;
  }

  update() {

    this.dataService
      .processData('update_user', {
        user_fname: this.fname,
        user_lname: this.lname,
        user_password: this.password,
        user_uname: this.uname,
        user_contact_no: this.contact,
        user_email: this.email,
        user_id: this.user_obj[0].user_id
      })
      .subscribe(
        (res: any) => {
          console.log(res);
          if (res.msg == 'Successfully Updated') {
            this.presentToast(res.msg);
          } else {
            this.presentToast(res.msg);
          }
        },
        (error: any) => {
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
