import {Component} from '@angular/core';
import {AuthenticationService} from "./authentication.service";

@Component({
    selector: 'login',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [AuthenticationService]
})
export class AppComponent {
    constructor() {
    }
}
