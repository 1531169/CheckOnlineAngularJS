import {Component} from '@angular/core';
import {AuthenticationService} from "../authentication.service";
import {CheckService} from "../check.service";
import {Chapter} from "../classes/chapter.class";
import {Student} from "../classes/student.class";

@Component({
    selector: 'app-navibar',
    templateUrl: './navibar.component.html',
    styleUrls: ['./navibar.component.css']
})

export class NavibarComponent {
    public student: Student;
    public chapters: Chapter[] = [];

    constructor(private authService: AuthenticationService,
                private checkService: CheckService) {
        var token = this.authService.getToken();
        this.checkService.getStudent(token).then(stud => this.student = stud);
        this.checkService.getChapters(token).then(chapters => this.chapters = chapters);
    }


    loadCompetences() {

    }

    logout() {
        this.authService.logout();
    }



    public isCollapsed:boolean = true;

    public collapsed(event:any):void {
        console.log(event);
    }

    public expanded(event:any):void {
        console.log(event);
    }
}
