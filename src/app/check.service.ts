import {Http, Response, Headers} from "@angular/http";
import {Injectable} from "@angular/core";
import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";
import {Avatar} from "./classes/avatar.class";
import {restUrls} from "./classes/restUrls.class";
import {Student, StudyGroup, School} from "./classes/student.class";
import {Chapter} from "./classes/chapter.class";
import {ChapterIllustration} from "./classes/chapterIllustration.class";
import {Error} from "./classes/error.class";
import {environment} from "../environments/environment.prod";
import {Competence} from "./classes/chapterCompetence.class";
// adds map function to observerable

@Injectable()
export class CheckService {

    constructor(private http: Http) {
    }

    private getAuthenticateHeaders(token) {
        var authHeaders = new Headers();
        authHeaders.append("Authorization", token);
        return {headers: authHeaders};
    }

    getAvatars(token): Promise<Avatar[]> {
        return this.http.get(restUrls.getAvatarUrl(),
            this.getAuthenticateHeaders(token))
            .toPromise()
            .then((res: Response) => res.json() as Avatar[])
            .catch(this.handleError);
    }

    getStudent(token): Promise<Student> {
        return this.http.get(restUrls.getStudentUrl(),
            this.getAuthenticateHeaders(token))
            .toPromise()
            .then((res: Response) => res.json() as Student)
            .catch(this.handleError);
    }

    getChapters(token): Promise<Chapter[]> {
        return this.http.get(restUrls.getChaptersUrl(),
            this.getAuthenticateHeaders(token))
            .toPromise()
            .then((res: Response) => res.json() as Chapter[])
            .catch(this.handleError);
    }

    getChapterById(token, id: number): Promise<Chapter> {
        return this.http.get(restUrls.getChapterById(id),
            this.getAuthenticateHeaders(token))
            .toPromise()
            .then((res: Response) => res.json() as Chapter)
            .catch(this.handleError);
    }

    getChapterIllustrationById(token, id: number): Promise<ChapterIllustration[]> {
        return this.http.get(restUrls.getChapterIllustrationsById(id),
            this.getAuthenticateHeaders(token))
            .toPromise()
            .then((res: Response) => res.json() as ChapterIllustration[])
            .catch(this.handleError);
    }

    getChapterCompetencesById(token, id: number, checked: boolean): Promise<Competence[]> {
        return this.http.get(restUrls.getCompetencesUrl(id, checked),
            this.getAuthenticateHeaders(token))
            .toPromise()
            .then((res: Response) => res.json() as Competence[])
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error("An error occured", error);
        return Promise.reject(error.message || error);
    }
}