import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { ExtendedFormControl } from 'src/app/utils/extended-form-control';
import { Validator, ValidatorType } from 'src/app/models/validator';
import { ResponseError } from 'src/app/models/responses/response-error';
import { FormService } from 'src/app/services/form.service';
import { ResourceService } from 'src/app/services/resource.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private formService: FormService,
    private resourceService: ResourceService
  ) { }

  form: FormGroup = new FormGroup({});

  async ngOnInit() 
  {
    this.form = new FormGroup({
      email: new ExtendedFormControl("", await this.resourceService.get("fields:Email"), [
        new Validator(ValidatorType.email, true, await this.resourceService.get("messages:EmailError")),
        new Validator(ValidatorType.required, true, await this.resourceService.get("messages:RequiredError"))
      ]),
      password: new ExtendedFormControl(null, await this.resourceService.get("fields:Password"), [
        new Validator(ValidatorType.required, true, await this.resourceService.get("messages:RequiredError")),
        new Validator(ValidatorType.minLength, 8, await this.resourceService.get("messages:MinLengthError")),
        new Validator(ValidatorType.maxLength, 32, await this.resourceService.get("messages:MaxLengthError")),
      ])
    });
  }

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