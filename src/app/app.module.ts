import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule, Routes} from "@angular/router";
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {NavibarComponent} from './navibar/navibar.component';
import {PageNotFoundComponent} from "./not-found.component";
import {HomeComponent} from './home/home.component';
import {AuthenticationService} from "./authentication.service";
import {DropdownModule, CollapseModule} from "ng2-bootstrap";
import { FooterComponent } from './footer/footer.component';

const appRoutes: Routes = [
    {path: 'chapter/:id', component: PageNotFoundComponent},
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
        FooterComponent
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
