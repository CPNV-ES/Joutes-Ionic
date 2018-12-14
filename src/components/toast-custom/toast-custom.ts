import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Injectable()
export class ToastCustom {
    public TYPE_ERROR = 'toastError'
    public TYPE_SUCCESS = 'toastSuccess'

  constructor(private toastCtrl: ToastController) {
  }

  showToast(msg: string, dur: number, type: string, closeBtn: boolean = false) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: dur,
      cssClass: type,
      showCloseButton: closeBtn
    });
    toast.present()
  }

}
