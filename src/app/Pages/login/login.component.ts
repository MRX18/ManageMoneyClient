import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { ExtendedFormControl } from 'src/app/utils/extended-form-control';
import { Validator, ValidatorType } from 'src/app/models/validator';
import { ResponseError } from 'src/app/models/responses/response-error';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup = new FormGroup({
    email: new ExtendedFormControl("", [
      new Validator(ValidatorType.email, true, "Email field: email message"),
      new Validator(ValidatorType.required, true, "Email field: required message")
    ]),
    password: new ExtendedFormControl(null, [
      new Validator(ValidatorType.required, true, "Password field: required message"),
      new Validator(ValidatorType.minLength, 8, "Password field: min length {0}"),
      new Validator(ValidatorType.maxLength, 32, "Password field: max length {0}"),
    ])
  });

  constructor(
    private authService: AuthService,
    private formService: FormService
  ) { }

  ngOnInit(): void {}

  submit() {
    if(this.form.valid) {
      this.authService.login(this.form.value.email, this.form.value.password).subscribe(res => {
        
      }, error => {
        if(error.error) {
          this.formService.setAspErrors(this.form, error.error);
        }
      });
    }
  }
}