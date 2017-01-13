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

    // TODO: Felder entfernen
    public avatare: Avatar[];
    public chapterIllustrations: ChapterIllustration[];
    public student: Student;

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

    // TODO: Methode entfernen
    onClick() {
        console.log('click');
        this.service.getStudent(this.auth.getToken()).then(stud => this.student = stud);
        //this.service.getAvatars(this.auth.getToken()).then(avas => this.avatare = avas);

        restUrls.getCompetencesUrl(3, true);

        var elm = document.getElementById("school");
        if (this.student) {
            if (this.student.school.length) {
                console.log("Ist ein Array");
                var schools: School[];
                schools = this.student.school;
                if (schools) {
                    for (var i = 0; i < schools.length; i++) {
                        elm.innerHTML += schools[i].name + "<br>";
                    }
                }
            } else {
                console.log("Ist KEIN Array");
            }
        } else {
            elm.innerHTML = "Daten sind noch nicht verfügbar.";
        }
        /*
         this.service.getChapterIllustrationById(this.auth.getToken(), 3)
         .then(chaps => this.chapterIllustrations = chaps);
         console.log(isUndefined(this.chapterIllustrations));
         if(this.chapterIllustrations) {
         console.log(isArray(this.chapterIllustrations).toString());
         console.log(this.chapterIllustrations.length);
         console.log(JSON.stringify(this.chapterIllustrations[2]));
         }*/
    }
}
