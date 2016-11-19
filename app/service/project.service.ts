/**
 * Created by ghj on 16-10-15.
 */
import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';

import {Project} from './project';

@Injectable()
export class ProjectService{

    constructor(private http:Http){}

    private url = 'http://localhost:8080';  //URL to nata server
    private headers = new Headers({'Content-Type':'application/json'});

    /*获取项目列表*/
    getProjects():Promise<Project[]>{
        const _url = `${this.url}/projects`;
        return this.http.get(_url)
            .toPromise()
            .then(response => {
                return response.json() as Project[]
            })
            .catch(this.handleError);
    }

    /*创建一个项目*/
    createProject(project:Project):Promise<Project>{
        const _url = `${this.url}/api/project`;
        return this.http.post(_url,JSON.stringify(project),{headers:this.headers})
            .toPromise()
            .then(res=> res.json())
            .catch(this.handleError)
    }

    /*错误处理*/
    private handleError(error:any):Promise<any>{
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

}