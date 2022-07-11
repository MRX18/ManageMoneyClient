import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Validator, ValidatorType } from 'src/app/models/validator';
import { AuthService } from 'src/app/services/auth.service';
import { FormService } from 'src/app/services/form.service';
import { ResourceService } from 'src/app/services/resource.service';
import { ExtendedFormControl } from 'src/app/utils/extended-form-control';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 
  constructor(
    private authService: AuthService,
    private formService: FormService,
    private resourceService: ResourceService
  ) { }

  form: FormGroup = new FormGroup({});

  async ngOnInit() {
    let password: ExtendedFormControl = new ExtendedFormControl(null, await this.resourceService.get("fields:Password"), [
      new Validator(ValidatorType.required, true, await this.resourceService.get("messages:RequiredError")),
      new Validator(ValidatorType.minLength, 8, await this.resourceService.get("messages:MinLengthError")),
      new Validator(ValidatorType.maxLength, 32, await this.resourceService.get("messages:MaxLengthError")),
    ]);

    this.form = new FormGroup({
      fullName: new ExtendedFormControl("", await this.resourceService.get("fields:FullName"), [
        new Validator(ValidatorType.required, true, await this.resourceService.get("messages:RequiredError")),
        new Validator(ValidatorType.minLength, 2, await this.resourceService.get("messages:MinLengthError")),
        new Validator(ValidatorType.maxLength, 32, await this.resourceService.get("messages:MaxLengthError")),
      ]),
      email: new ExtendedFormControl("", await this.resourceService.get("fields:Email"), [
        new Validator(ValidatorType.email, true, await this.resourceService.get("messages:EmailError")),
        new Validator(ValidatorType.required, true, await this.resourceService.get("messages:RequiredError"))
      ]),
      password: password,
      confirmPassword: new ExtendedFormControl(null, await this.resourceService.get("fields:ConfirmPassword"), [
        new Validator(ValidatorType.required, true, await this.resourceService.get("messages:RequiredError")),
        new Validator(ValidatorType.minLength, 8, await this.resourceService.get("messages:MinLengthError")),
        new Validator(ValidatorType.maxLength, 32, await this.resourceService.get("messages:MaxLengthError")),
        new Validator(ValidatorType.compare, password, await this.resourceService.get("messages:CompareError"))
      ])
    });
  }

  submit() {
    console.log(this.resourceService.get(""));
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
