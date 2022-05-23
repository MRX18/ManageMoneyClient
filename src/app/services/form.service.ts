import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ResponseError } from '../models/responses/response-error';
import { ExtendedFormControl } from '../utils/extended-form-control';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(
    private notificationService: NotificationService
  ) { }

  public setAspErrors(form: FormGroup, response: ResponseError) {
    let otherErrors = [];
    if(response.errors) {
      let keys = Object.keys(response.errors);
      for(let i = 0; i < keys.length; i++) {
        let key = keys[i];
        if(form.controls.hasOwnProperty(key.toLocaleLowerCase())) {
          if(response.errors[key].length > 0) {
            (form.controls[key.toLocaleLowerCase()] as ExtendedFormControl).message = response.errors[key][0];
          }
        } else {
          otherErrors.push(response.errors[key][0]);
        }
      }
    }

    if(otherErrors.length > 0) {
      this.notificationService.information(otherErrors[0]);
    }
  }
}
