import { AlertType } from "./AlertType";

export class alert{
    public  type: string
    constructor(type:AlertType, public message: string ){
        this.type='none'
        setTimeout(() => this.type=type.toString(),1);
        setTimeout(() => this.type='none', 3000);
    }
} 
