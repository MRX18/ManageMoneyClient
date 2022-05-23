import { AbstractControl, ValidatorFn, Validators } from "@angular/forms";
import { ExtendedFormControl } from "../utils/extended-form-control";

export enum ValidatorType {
    required,
    email,
    minLength,
    maxLength,
    compare
}

export class Validator {
    type: ValidatorType | null = null;
    data: string | number | boolean | ExtendedFormControl | null = null;
    message: string = "";

    constructor(type: ValidatorType, data: string | number | boolean | ExtendedFormControl, message: string) {
        this.type = type;
        this.data = data;
        this.message = message;
    }

    public getValidator(current: ExtendedFormControl): ValidatorFn | null {
        let validator: ValidatorFn | null = null;
        switch(this.type) {
            case ValidatorType.required: validator = Validators.required; break;
            case ValidatorType.email: validator = Validators.email; break;
            case ValidatorType.minLength: validator = Validators.minLength(typeof this.data === 'number' ? this.data : 0); break;
            case ValidatorType.maxLength: validator = Validators.maxLength(typeof this.data === 'number' ? this.data : 0); break;
            case ValidatorType.compare: validator = this.compare(current); break;
        }

        return validator;
    }

    public setCustomValidator(current: ExtendedFormControl) {
        switch(this.type) {
            case ValidatorType.compare: this.compare(current); break;
        }
    }

    private compare(current: ExtendedFormControl): ValidatorFn {
        return (current: AbstractControl) : {[key: string]: boolean} | null => {
        let control = this.data as ExtendedFormControl;
        if(current.value != control.value) {
            return {"compare": true};
        }

        return null;
        }
    }
}