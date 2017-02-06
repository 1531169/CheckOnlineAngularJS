import {Component, DoCheck} from '@angular/core';
import {AuthenticationService} from "./authentication.service";
import {CheckService} from "./check.service";
import {Router} from "@angular/router";
declare var jQuery: any;

@Component({
    selector: 'login',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [AuthenticationService, CheckService]
})
export class AppComponent implements DoCheck{
    constructor() {
    }

    ngDoCheck() {
        /*
        jQuery(document).ready(function() {
            var h = (jQuery(window).height() - 125);
            jQuery("main").height(h);
            //console.log(h + " | " + jQuery(".pre-scrollable").height());
        });
        jQuery(window).resize(function() {
            var h = (jQuery(window).height() - 125);
            jQuery("main").height(h);
            //console.log(h + " | " + jQuery(".pre-scrollable").height());
        });
        */
    }
}
