import {Component, OnInit} from '@angular/core';
import {ElementFinder} from "protractor";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

    public color: string;
    public goon = "...";

    onKeyUp() {
        console.log('keyup: ' +
            this.color)
    }

    onClick() {
        console.log('click');
    }
}
