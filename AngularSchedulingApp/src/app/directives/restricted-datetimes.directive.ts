import { AbstractControl, FormGroup, ValidatorFn } from "@angular/forms";

// verifies that the starting date is equal to or after today's date
export function startDateValidator() :ValidatorFn {

    return (control: AbstractControl) :{[key: string]: boolean} | null => {

        let currentDate = new Date();
        currentDate.setHours(0,0,0,0);

        let inputArr = control.value.split('-');
        let inputDate = new Date(`${inputArr[1]}/${inputArr[2]}/${inputArr[0]}`)

        if (inputDate < currentDate) {
            return {'StartDateBeforeCurrentDate':true};
        }
        return null;
    }
}

// verifies that the ending date is equal to or after the starting date
export function endDateValidator(startDateInput: Date): ValidatorFn {

    return (control: AbstractControl) :{[key: string]: boolean} | null => {
        // starting date
        let startDate = new Date(startDateInput);
        startDate.setHours(0,0,0,0);

        // ending date
        if (control.value) {
            let inputArr = control.value.split('-');
            let inputDate = new Date(`${inputArr[1]}/${inputArr[2]}/${inputArr[0]}`)
            inputDate.setHours(0,0,0,0);
    
            // if the starting date is before the input ending date
            if (startDate > inputDate) {
                return {'StartDateAfterEndDate':true};
            }
            return null;
        }
        return null;  
    }
}