import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-competence',
    templateUrl: './competence.component.html',
    styleUrls: ['./competence.component.css']
})
export class CompetenceComponent {

    constructor(private route: ActivatedRoute) {
    }
}
