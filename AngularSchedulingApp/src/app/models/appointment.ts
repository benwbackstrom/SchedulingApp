export class Appointment {
    booked: boolean = false;    //initialized false in case there is an error in calendar
    firstName!: string;
    lastName!: string;
    email!: string;
    phoneNumber!: string;
    //For now I have these as strings, but they may be better as other variables
    location!: string;
    date!: string;
    time!: number;
}
