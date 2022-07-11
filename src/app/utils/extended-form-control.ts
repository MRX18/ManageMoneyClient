import { AbstractControl, FormControl, ValidatorFn } from "@angular/forms";
import { Validator, ValidatorType } from "../models/validator";

export class ExtendedFormControl extends FormControl {

    message: string = "";
    displayName?: string = "";

    constructor(formState?: any, displayName?: string, validators?: Validator[] | null) {
        super(formState);
        this.displayName = displayName;
        this.messageEvent(validators);
        this.setValidator(validators);
    }

    private setValidator(validators?: Validator[] | null) {
        let result = new Array<ValidatorFn>();
        if(validators && validators.length > 0) {
            result = [];
            for(let i = 0; i < validators.length; i++) {
                let validator = validators[i].getValidator(this);
                if(validator) {
                    result.push(validator);
                }
            }
        }

        this.setValidators(result);
    }

    private messageEvent(validators?: Validator[] | null) {
        this.statusChanges.subscribe(status => {
            if(this.invalid) {
                let errorKeys = Object.keys(this.errors ?? {});
                if(errorKeys.length > 0 && validators && validators.length > 0) {
                    let index = validators.findIndex(v => {
                        if(v.type !== null) {
                            return errorKeys[0] === ValidatorType[v.type].toLowerCase();
                        } else {
                            return false;
                        }
                    });

                    if(index !== -1) {
                       this.message = this.stringFormat(validators[index].message, [validators[index].data]);
                       return;
                    }
                }
            }

            this.message = "";
        });
    }

    private stringFormat(text: string, data?: Array<string | number | boolean | ExtendedFormControl | null>): string {
        debugger;
        if(this.displayName) {
            data?.unshift(this.displayName);
        }

        return text.replace(/{([0-9]+)}/g, function (match, index) : string {
            return data && data.length > index ? data[index] as string : match;
        });
    }
}