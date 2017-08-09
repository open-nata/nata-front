/**
 * Created by ghj on 16-10-14.
 */

import {Injectable } from '@angular/core'
import {Headers, Http} from '@angular/http'
import 'rxjs/add/operator/toPromise'

import {Apk} from './apk'
import {Configuration} from './configuration'

@Injectable()
export class ApkService{
    constructor(private http:Http){}

    // private url = 'http://localhost:8080';
    private url = Configuration.url;
    private headers = new Headers({'Content-Type':'application/json'})

    /*获取Apk列表*/
    getApks(project:string):Promise<Apk[]>{
        const _url = `${this.url}/api/apks/${project}`
        console.log(project+'project')
        return this.http.get(_url)
            .toPromise()
            .then(response =>response.json() as Apk[])
            .catch(this.handleError)
    }

    /*增加一个Apk*/
    createApk(apk:Apk):Promise<Apk>{
        const _url = `${this.url}/api/apk`
        return this.http.post(_url,JSON.stringify(apk),{headers:this.headers})
            .toPromise()
            .then(res => res.json() as Apk)
            .catch(this.handleError)
    }

    /*删除一个Apk*/
    deleteApk(apk:Apk):Promise<any>{
        const _url = `${this.url}/api/apk/${apk.name}/${apk.version}`
        return this.http
            .delete(_url,{headers:this.headers})
            .toPromise()
            .then(res => res)
            .catch(this.handleError)
    }


    /*Get targeted apk with project and version*/
    getApk(project:string,version:string):Promise<Apk>{
        const _url = `${this.url}/api/apk/${project}/${version}`;
        return this.http.get(_url)
            .toPromise()
            .then(res=> res.json() as Apk)
            .catch(this.handleError)
    }

    /*错误处理*/
    private handleError(error:any):Promise<any>{
        console.log("An error occured : apk service",error)
        return Promise.reject(error.message || error)
    }
}