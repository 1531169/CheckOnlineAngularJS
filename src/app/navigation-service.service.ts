import {Http, Response, Headers} from "@angular/http";
import {Injectable} from "@angular/core";
import "rxjs/add/operator/map";
import {AuthenticationService} from "./authentication.service";
// adds map function to observerable

@Injectable()
export class NavigationServiceService {
    private serverAddress = "http://46.101.204.215:1337/api/V1/";
    private avatarPath = "avatar/";
    private loginPath = "login";

    private isAuthenticated:boolean = false;

    constructor(private http : Http, private auth: AuthenticationService) {
    }

    private result: Array<Object>;

    getAvatars() {
        var authHeaders = new Headers();
        if(this.auth.isAuthenticated()) {
            authHeaders.append("Authorization", this.auth.getToken());
            console.log("sollte was passieren...")
        }
        console.log(this.auth.getToken());
        return this.http.get(this.serverAddress + this.avatarPath, {headers : authHeaders})
                .map((res: Response) => this.result = res.json());
    }
}
