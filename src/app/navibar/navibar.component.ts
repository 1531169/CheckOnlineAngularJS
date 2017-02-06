import {Component} from '@angular/core';
import {AuthenticationService} from "../authentication.service";
import {CheckService} from "../check.service";
import {Chapter} from "../classes/chapter.class";
import {Student} from "../classes/student.class";
import {Router} from "@angular/router";
import {Avatar} from "../classes/avatar.class";

@Component({
    selector: 'app-navibar',
    templateUrl: './navibar.component.html',
    styleUrls: ['./navibar.component.css']
})

export class NavibarComponent {
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
        let style = document.createElement('style');
        await this.checkService.getStudent(token).then(stud => {
            this.student = stud;
            if(this.student) {
                // generate style for navigation items
                style.appendChild(document.createTextNode(
                    this.getClass("navSchool",
                        this.student.school.imageUrlInactive,
                        this.student.school.imageUrl)
                    + this.getClass("navClass",
                        this.student.studyGroups.imageUrlInactive,
                        this.student.studyGroups.imageUrl)));
            }
        });

        // get avatar of the user
        await this.checkService.getAvatars(token).then(avatare => {
            for(var avatar of avatare) {
                if(avatar._id = this.student.avatarId) {
                    // generate style for navigation items
                    style.appendChild(document.createTextNode(
                        this.getClass("navAvatar",
                            avatar.avatarInactiveUrl,
                            avatar.avatarUrl)));
                }
            }
        });

        // get the chapter for the navigation
        await this.checkService.getChapters(token).then(chapters => {
            this.chapters = chapters;
            this.chapters.forEach(chapter => {
                // generate style for navigation items
                style.appendChild(document.createTextNode(
                    this.getNavCompetenceClass(chapter._id,
                        chapter.strongcolor,
                        chapter.weakcolor)));
            });
        });
        document.getElementsByTagName('head')[0].appendChild(style);
    }

    /**
     * Used as template for the css style of the navigation elements navAvatar, navSchool and navClass.
     * @param elmId
     * @param inactiveUrl
     * @param activeUrl
     * @returns {string}
     */
    getClass(elmId: string, inactiveUrl: string, activeUrl: string) {
        return  `#${elmId} {
            background: url('../..${inactiveUrl}') transparent no-repeat; 
            background-size: 40px 40px;
        }
        #${elmId}:hover, #${elmId}:focus, .open > #${elmId} {
            background: url('../..${activeUrl}');
            background-size: 40px 40px;
        }`;
    }

    /**
     * Used as template for the css classes of the different navigation items whose color is specified from the message.
     * @param chapterId
     * @param color
     * @param colorHover
     * @returns {string}
     */
    getNavCompetenceClass(chapterId: number, color: string, colorHover: string) {
        return `li#chapter${chapterId} > a {
            background-color: ${color};
            color: #FFF;
        }
        li#chapter${chapterId} > a:hover {
            background-color: ${colorHover};
            color: #FFF;
        }`;
    }

    logout() {
        this.authService.logout();
    }

    onSelect(chapter: Chapter) {
        this.router.navigate(['/chapters', chapter._id]);
    }
}
