import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../authentication.service";
import {CheckService} from "../check.service";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    providers: [CheckService]
})
export class HomeComponent {
    result: string;

    constructor(public authService: AuthenticationService,
                private checkService: CheckService) {
        if(authService.getToken()) {
            this.result = "Authentifiziert...";
        } else {
            this.result = "leeer";
        }
    }

    logout() {
        localStorage.removeItem("token");
    }
}
