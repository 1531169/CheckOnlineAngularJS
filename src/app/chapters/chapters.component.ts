import {Component, OnInit, DoCheck, OnDestroy} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CheckService} from "../check.service";
import {ChapterIllustration} from "../classes/chapterIllustration.class";
import {Chapter} from "../classes/chapter.class";
import {Competence} from "../classes/chapterCompetence.class";
import {AuthenticationService} from "../authentication.service";
import 'rxjs/add/operator/switchMap';
//declare var jQuery: any;

@Component({
    selector: 'app-chapters',
    templateUrl: './chapters.component.html',
    styleUrls: ['./chapters.component.css']
})

export class ChaptersComponent implements OnInit, DoCheck, OnDestroy {
    public result: string;

    private chapter: Chapter;
    private selectedID: number;
    private chapterIllus: ChapterIllustration[] = [];
    private chapterComps: Competence[] = [];
    private chapterFolderUrl: string;

    constructor(private route: ActivatedRoute,
                private checkService: CheckService,
                private authService: AuthenticationService) {
    }

    ngOnInit() {
        /*
         // TODO: load selected chapter
         // TODO: request chapter by ID, chapter illustrations by ID, studentcompetences
         } else {
         // TODO: load all chapters
         }

         */
    }

    ngDoCheck() {
        let id = +this.route.snapshot.params["id"];
        if (this.selectedID != id) {
            this.selectedID = id;
            this.loadData(id);
        }
    }

    ngOnDestroy() {
        // TODO: hintergrundfarbe zurücksetzen
        var main = document.getElementsByTagName("body").item(0);
        if (main) {
            main.style.backgroundColor = '#FFFFFF';
            console.log(main.style.backgroundColor);
        }
        console.log(main);
    }

    getStudentText(index: number): string {
        if(this.chapterComps[index]) {
            return this.chapterComps[index].studentText;
        }
        return "";
    }

    getTeacherText(index: number): string {
        if(this.chapterComps[index]) {
            return this.chapterComps[index].teacherText;
        }
        return "";
    }

    getDateFrom(index: number): string {
        if(this.chapterComps[index]) {
            return this.chapterComps[index].fromDate;
        }
        return "";
    }

    getChecked(index: number): boolean {
        if(this.chapterComps[index]) {
            return this.chapterComps[index].checked;
        }
        return false;
    }

    getImageUrl(index: number) {
        if(this.chapterComps[index]) {
            if(this.chapterComps[index].checked) {
                return this.chapterFolderUrl + "competenceDone.png";
            } else {
                return this.chapterFolderUrl + "competenceUndone.png";
            }
        }
        return "";
    }

    async loadData(id) {
        var token = this.authService.getToken();

        var folder: string = id.toLocaleString();
        if (id < 10) {
            folder = "0" + id.toLocaleString();
        }
        this.chapterFolderUrl = "../../images/chapter" + folder + "/";

        await this.checkService.getChapterById(token, id)
            .then(chap => this.chapter = chap);
        this.changeView(id);

        await this.checkService.getChapterIllustrationById(token, id)
            .then(illus => this.chapterIllus = illus);

        await this.checkService.getChapterCompetencesById(token, id, false)
            .then(comps => this.chapterComps = comps);

        this.updateCompetences();
    }

    private changeView(id) {
        var main = document.getElementsByTagName("body").item(0);
        if (main) {
            main.style.backgroundColor = this.chapter.weakcolor;
        }

        this.flagUrl = this.chapterFolderUrl + "littleChapterFlag.png";
    }

    private construction: Array<CompetenceGroup> = null;
    private flagUrl = "";

    private updateCompetences() {
        var max = (this.chapterComps.length / 5);
        if (max > Math.floor(max)) {
            max = Math.floor(max) + 1;
        }

        this.construction = new Array<CompetenceGroup>(max);
        for (var k = 0; k < max; k++) {
            var anzahl = 5;
            if (k == (max - 1)) {
                anzahl = this.chapterComps.length - (k * 5);
            }

            this.construction[k] = new CompetenceGroup(anzahl);
            this.construction[k].illustration = this.chapterIllus[k];
            for (var i = 0; i < anzahl; i++) {
                var elmId = ((k * 5) + i);
                this.construction[k].competences[i] = this.chapterComps[elmId];
            }
        }
    }
}

class CompetenceGroup {
    public competences: Array<Competence>;
    public illustration: ChapterIllustration;

    constructor(length: number) {
        this.competences = new Array<Competence>(length);
    }
}
