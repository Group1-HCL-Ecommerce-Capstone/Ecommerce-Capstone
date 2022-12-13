import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { OktaAuthStateService, OKTA_AUTH } from "@okta/okta-angular";
import OktaAuth, { AuthState } from "@okta/okta-auth-js";
import { filter, map, Observable } from "rxjs";
import { LocalService } from "./local.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    currentUser: any;
    public isAuthenticated$!: Observable<boolean>;
    isLoggedInOkta!: boolean;

    constructor(private localStore: LocalService,
        private _oktaStateService: OktaAuthStateService,
        @Inject(OKTA_AUTH) private _oktaAuth: OktaAuth,
    ) {
        this.currentUser = this.localStore.getData();
        this.isAuthenticated$ = this._oktaStateService.authState$.pipe(
            filter((s: AuthState)=>!!s),
            map((s: AuthState) => s.isAuthenticated ?? false)
          );
        this.isAuthenticated$.forEach((x)=>this.isLoggedInOkta = x);
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.handleAccess(req, next);
    }

    private handleAccess(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.isLoggedInOkta){
            return next.handle(req);
        }else {
            const allowedOrigins = ['https://ecommerce-capstone-be.azurewebsites.net'];
        if (allowedOrigins.some(url => req.urlWithParams.includes(url))) {
        }

        let jwt = this.currentUser.token;
        console.log(jwt);
        req = req.clone({
            setHeaders: {
                //'Content-Type': 'application/json',
                Authorization: `Bearer ${jwt}`
            }
            //headers: req.headers.append('Access-Control-Allow-Origin', 'http://localhost:8181/')
        });
        return next.handle(req);
        }
        
    }


}





/*This is for sending Okta tokens
constructor(@Inject(OKTA_AUTH) private _oktaAuth: OktaAuth){}

intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.handleAccess(req, next);
    
}

private handleAccess(req: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>>{
    const allowedOrigins = ['http://localhost'];
    if (allowedOrigins.some(url => req.urlWithParams.includes(url))){
        const accessToken = this._oktaAuth.getAccessToken();
        //console.log(accessToken);
        req = req.clone({
            setHeaders: {
                Authorization: 'Bearer '+accessToken
            }
            //headers: req.headers.append('Access-Control-Allow-Origin', 'http://localhost:8181/')
        });
    }
    
    return next.handle(req);
}
*/
