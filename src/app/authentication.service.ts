import {Http, Response, Headers} from "@angular/http";
import {Injectable} from "@angular/core";
import "rxjs/add/operator/map"; // adds map function to observerable
import "rxjs/add/operator/toPromise";
import {restUrls} from "./classes/restUrls.class";
import {Router} from "@angular/router";
import {environment} from "../environments/environment.prod";

@Injectable()
export class AuthenticationService {
    private isAuth: boolean = false;
    private token: string;

    // TODO: wahrscheinlich für modalen Dialog benötigte Felder
    private isInvalid: boolean = false;
    private isError: boolean = false;

    private localStorageTokenID = "token";
    private loginPath = "/home";
    private logoutPath = "";

    constructor(private http: Http, public router: Router) {
        var key = localStorage.getItem(this.localStorageTokenID);
        environment.log(localStorage.getItem(this.localStorageTokenID));
        if(key != null) {
            this.success(key);
            environment.log("EINGELOGGT");
        } else {
            // nicht eingeloggt
            environment.log("NICHT EINGELOGGT");
            this.redirect(this.logoutPath);
        }
    }

    async login(username, password) {
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        await this.http.put(restUrls.getLoginUrl(),
            JSON.stringify({username, password}),
            {headers: headers})
            .map((res: Response) => res.json())
            .subscribe(
                data => this.handleSuccess(data, this),
                this.handleError
            );
    }

    logout() {
        localStorage.removeItem(this.localStorageTokenID);
        this.redirect(this.logoutPath);
    }

    isAuthenticated() {
        return this.isAuth;
    }

    private setIsAuth(isAuth:boolean) {
        this.isAuth = isAuth;
    }

    getToken() {
        return this.token;
    }

    setToken(token:string) {
        this.token = token;
    }

    private handleSuccess(data, obj:AuthenticationService) {
        if (data) {
            obj.success(data.token);
        }
    }

    private success(token:string) {
        localStorage.setItem(this.localStorageTokenID, token);
        this.setToken(token)
        this.setIsAuth(true);
        this.redirect(this.loginPath);
    }

    private handleError(error: any) {
        console.error("An error occured", error);
    }

    private redirect(path) {
        this.router.navigate([path]);
    }
}
