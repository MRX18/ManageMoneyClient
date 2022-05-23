import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Validator, ValidatorType } from 'src/app/models/validator';
import { AuthService } from 'src/app/services/auth.service';
import { FormService } from 'src/app/services/form.service';
import { ExtendedFormControl } from 'src/app/utils/extended-form-control';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private password: ExtendedFormControl = new ExtendedFormControl(null, [
    new Validator(ValidatorType.required, true, "Password field: required message"),
    new Validator(ValidatorType.minLength, 8, "Password field: min length {0}"),
    new Validator(ValidatorType.maxLength, 32, "Password field: max length {0}"),
  ]);

  form: FormGroup = new FormGroup({
    fullName: new ExtendedFormControl("", [
      new Validator(ValidatorType.required, true, "Name: required message"),
      new Validator(ValidatorType.minLength, 2, "Min field {0}"),
      new Validator(ValidatorType.maxLength, 32, "Max field {0}"),
    ]),
    email: new ExtendedFormControl("", [
      new Validator(ValidatorType.email, true, "Email field: email message"),
      new Validator(ValidatorType.required, true, "Email field: required message")
    ]),
    password: this.password,
    confirmPassword: new ExtendedFormControl(null, [
      new Validator(ValidatorType.required, true, "Password field: required message"),
      new Validator(ValidatorType.minLength, 8, "Password field: min length {0}"),
      new Validator(ValidatorType.maxLength, 32, "Password field: max length {0}"),
      new Validator(ValidatorType.compare, this.password, "Password field: not compare")
    ])
  });

  constructor(
    private authService: AuthService,
    private formService: FormService
    ) { }

  ngOnInit(): void {
  }

  submit() {
    if(this.form.valid) {
      this.authService.register(this.form.value).subscribe(res => {
        
      }, error => {
        if(error.error) {
          this.formService.setAspErrors(this.form, error.error);
        }
      });
    }
  }

}
