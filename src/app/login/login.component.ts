import {Component} from '@angular/core';
import {AuthenticationService} from "../authentication.service";
import {CheckService} from "../check.service";
import {Avatar} from "../classes/avatar.class";
import {Student, School} from "../classes/student.class";
import {ChapterIllustration} from "../classes/chapterIllustration.class";
import {restUrls} from "../classes/restUrls.class";
import {isUndefined} from "util";
import {Router} from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [CheckService]
})

export class LoginComponent {
    private username: string;
    private password: string;
    private message: string;

    constructor(private service: CheckService,
                private auth: AuthenticationService, private router: Router) {
    }

    login() {
        // TODO: Anpassen für modalen Dialog
        if (!isUndefined(this.username) && !isUndefined(this.password)) {
            this.auth.login(this.username, this.password);

            if(!this.auth.isAuthenticated()) {
                this.message = "Benutzername oder Password ist falsch.";
            }
        } else {
            this.message = "Bitte Benutzernamen und Passwort angeben...";
        }
    }
}
