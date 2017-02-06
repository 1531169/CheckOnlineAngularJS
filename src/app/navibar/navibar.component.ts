import {Component} from '@angular/core';
import {AuthenticationService} from "../authentication.service";
import {CheckService} from "../check.service";
import {Chapter} from "../classes/chapter.class";
import {Student} from "../classes/student.class";
import {Router} from "@angular/router";

@Component({
    selector: 'app-navibar',
    templateUrl: './navibar.component.html',
    styleUrls: ['./navibar.component.css']
})

export class NavibarComponent {
    public keyStdImg: string = "std_img";
    public keyHoverImg: string = "hover_img";
    public navAvatarStyle: string = "#navAvatar {background: url('../..std_img') transparent no-repeat;}#navAvatar:hover, #navAvatar:focus, .open > #navAvatar {background: url('../..hover_img');}";
    public navSchoolStyle: string = "#navSchool {background: url('../..std_img') transparent no-repeat;}#navSchool:hover, #navSchool:focus, .open > #navSchool {background: url('../..hover_img');}";
    public navClassStyle: string = "#navClass {background: url('../..std_img') transparent no-repeat;}#navClass:hover, #navClass:focus, .open > #navClass {background: url('../..hover_img');}";

    public isCollapsed: boolean = true;
    public student: Student;
    public chapters: Chapter[] = [];

    constructor(private authService: AuthenticationService,
                private checkService: CheckService,
                private router:Router) {
        this.loadData();
    }

    async loadData() {
        var token = this.authService.getToken();
        await this.checkService.getStudent(token).then(stud => this.student = stud);
        var avatar = document.getElementById('navAvatar');
        if (avatar) {
            var style = document.createElement('style');
            var navSchool = this.getClass("navSchool", this.student.school.imageUrlInactive, this.student.school.imageUrl);
            var navClass = this.getClass("navClass", this.student.studyGroups.imageUrlInactive, this.student.studyGroups.imageUrl);
            style.appendChild(document.createTextNode(navSchool + navClass));
            document.getElementsByTagName('head')[0].appendChild(style);
        }
        await this.checkService.getChapters(token).then(chapters => this.chapters = chapters);
    }

    getClass(elmId: string, inactiveUrl: string, activeUrl: string) {
        return "#${elmId} {background: url('../..${inactiveUrl}') transparent no-repeat;}#${elmId}:hover, #${elmId}:focus, .open > #${elmId} {background: url('../..${activeUrl}');}";
    }

    logout() {
        this.authService.logout();
    }

    onSelect(chapter: Chapter) {
        this.router.navigate(['/chapters', chapter._id]);
    }
}
