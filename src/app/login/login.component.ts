import {Component, OnInit} from '@angular/core';
import {NavigationServiceService} from "../navigation-service.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [NavigationServiceService]
})

export class LoginComponent implements OnInit {
    public avatare = <Object>[];

    public testvar: String;

    constructor(private service: NavigationServiceService) {
        this.service.getAvatars().subscribe(avas => this.avatare = avas);
    }

    ngOnInit() {

    }

    public color: string;

    onKeyUp() {
        console.log('keyup: ' +
            this.color)
    }

    onClick() {
        console.log('click');
    }
}
