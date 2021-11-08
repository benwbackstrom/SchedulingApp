export class Locationmodel {

    constructor(
        public formatted_address:string,
        public lat:number,
        public lng:number,
        public distance:number
    ){}
}
