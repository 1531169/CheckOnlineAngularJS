import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule, Routes, RouterState} from "@angular/router";
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {NavibarComponent} from './navibar/navibar.component';
import {PageNotFoundComponent} from "./not-found.component";
import {HomeComponent} from './home/home.component';
import {AuthenticationService} from "./authentication.service";
import {DropdownModule, CollapseModule} from "ng2-bootstrap";
import { FooterComponent } from './footer/footer.component';
import { CompetenceComponent } from './competence/competence.component';
import { ChaptersComponent } from './chapters/chapters.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

const appRoutes: Routes = [
    {path: 'chapters', component: ChaptersComponent},
    {path: 'chapters/:id', component: ChaptersComponent},
    {path: 'home', component: HomeComponent},
    {path: '', component: LoginComponent},
    {path: '**', component: PageNotFoundComponent}
];

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        NavibarComponent,
        PageNotFoundComponent,
        HomeComponent,
        FooterComponent,
        CompetenceComponent,
        ChaptersComponent,
        ChangePasswordComponent
    ],
    imports: [
        CollapseModule.forRoot(),
        DropdownModule.forRoot(),
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(appRoutes)
    ],
    providers: [AuthenticationService],
    bootstrap: [AppComponent]
})

export class AppModule {
    constructor() {
    }
}