import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
    constructor(private authService:AuthService, private router:Router){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        // süreç içerisindeki dataya müdahale edip geriye bir değer döndürmek istediğimizde map operatörünü kullanıyoruz.
        // gelen user bilgisine bakıyoruz, eğer bir user bilgisi varsa true değer yoksa false değer döndürecek
        // bize bunun tam tersi lazım olduğu için başına ! daha koyarak değilini alıyoruz
        // tap operatörünü ise dönen değeri yakalamak için kullanıyoruz
        return this.authService.user.pipe(
            map(user => {
                return !!user;
            }),
            tap(isAuth => {
                if(!isAuth){
                    this.router.navigate(['/login']);
                }
            }));
    }   
}