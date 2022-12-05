import { Injectable } from "@angular/core";

declare let alertify:any;

//modüle ekleme yöntemine göre global veya yerel bir servis oluşturabiliriz
//global bir servis oluşturmak için servisi componente inject etmemiz gerekmekte
@Injectable({
    providedIn:'root' 
}
//    {
//     buraya providedIn yazılarak projeye import edilebilir veya app.module.ts içerisinde providers içerisine
//     AlertfiyService eklenerek import işlemi gerçekleştirilebilir
//     providedIn: 'root'}
)

export class AlertifyService {
    
    constructor(){ }

    success(message:string){
        alertify.success(message);
    }

    error(message:string){
        alertify.error(message);
    }

    warning(message:string){
        alertify.warning(message);
    }
}