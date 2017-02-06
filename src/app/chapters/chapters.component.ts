import {Component, OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router, Params} from "@angular/router";
import {CheckService} from "../check.service";
import {ChapterIllustration} from "../classes/chapterIllustration.class";
import {Chapter} from "../classes/chapter.class";
import {Competence} from "../classes/chapterCompetence.class";
import {AuthenticationService} from "../authentication.service";
import {environment} from "../../environments/environment.prod";
import 'rxjs/add/operator/switchMap';
import {Observable} from "rxjs";

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
        environment.log("DESTROY CHAPTER");
    }

    async loadData(id) {
        var token = this.authService.getToken();

        await this.checkService.getChapterById(token, id)
            .then(chap => this.chapter = chap);
        this.changeView(id);

        await this.checkService.getChapterIllustrationById(token, id)
            .then(illus => this.chapterIllus = illus);
        //environment.log(this.chapterIllus);

        await this.checkService.getChapterCompetencesById(token, id, false)
            .then(comps => this.chapterComps = comps);
        //environment.log(this.chapterComps);
        this.updateCompetences();
    }

    private changeView(id) {
        //environment.log(this.chapter);

        //var main = document.getElementById('representation').parentElement;
        var main = document.getElementsByTagName("body").item(0);
        if (main) {
            main.style.backgroundColor = this.chapter.strongcolor;
        }

        var flag = document.getElementById("flag");
        var folderNr: string = id.toLocaleString();
        if (id < 10) {
            folderNr = "0" + id.toLocaleString();
        }
        if (flag) {
            flag.setAttribute("src", "../../images/chapter" + folderNr + "/littleChapterFlag.png");
        }
    }

    private construction: Array<CompetenceGroup> = [];

    private updateCompetences() {
        var max = (this.chapterComps.length / 5);
        var count = max;
        if (max > Math.floor(max)) {
            max = Math.floor(max) + 1;
        }
        console.log(max + "");
        this.construction = new Array<CompetenceGroup>(max + 1);

        console.log(this.construction);
        environment.log(Math.floor(max));

        for (var j = 0; j < max; j++) {
            var ende = 5;

            if (j == (max - 1)) {
                ende = count % 5;
            }
            console.log(j);
            this.construction[j] = new CompetenceGroup(ende);

            for (var i = 0; i < ende; i++) {
                console.log(((j * 5) + i));
                this.construction[j].set(i, this.chapterComps[(j * 5 + i)]);
            }
        }
    }
}

class CompetenceGroup {
    constructor(length: number) {
        this.elm = new Array<Competence>(length);
    }

    public elm: Array<Competence>;

    public set(index: number, c: Competence) {
        this.elm[index] = c;
    }
}
