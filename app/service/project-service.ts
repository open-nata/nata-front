/**
 * Created by ghj on 16-10-15.
 */
import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';

import {Project} from './project';


@Injectable()
export class ProjectService{

    private url = 'http://localhost:8080';  //URL to nata server
    private headers = new Headers({'Content-Type':'application/json'});

    constructor(private http:Http){}

    /*获取项目列表*/
    getProjects():Promise<Project[]>{

        const _url = `${this.url}/projects`;
        return this.http.get(_url)
            .toPromise()
            .then(response => response.json() as Project[])
            .catch(this.handleError);
    }

    /*错误处理*/
    private handleError(error:any)

}