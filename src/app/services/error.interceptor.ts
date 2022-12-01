import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(catchError((response: HttpErrorResponse) => {
            let message = "Bir Hata Oluştu!";

            if(!navigator.onLine){
                message = "İnternet bağlantınız yok!";
                return throwError(message);
              }
            
            if(response.error.error){
                if(response.status === 401){
                    message = "Bu sayfayı görüntülemek için yetkiniz yok.";
                    console.log(message);
                    return throwError(message);
                }
            }
          
            if(response.error.error){
                switch(response.error.error.message){
                case "EMAIL_EXISTS": 
                    message = "Girilen mail ile daha önceden üye olunmuş!";
                    break;
                case "EMAIL_NOT_FOUND":
                    message = "Girilen mail adresi bulunamadı!";
                    break;
                case "INVALID_PASSWORD":
                    message = "Girilen şifre doğru değil!";
                    break;
                }
            }

            return throwError(message);
        }));
    }
}