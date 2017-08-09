/**
 * Created by ghj on 16-11-18.
 */

import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {Testplan} from './testplan';
import {Testsample} from './test.sample';
import {Configuration} from './configuration'

@Injectable()
export class TestplanService{
    private headers = new Headers({'Content-type':'application/json'});
    // private url = 'http://localhost:8080';   //URL to nata-server

    private  url = Configuration.url;

    constructor(private http:Http){}

    /*获取Testplan列表*/
    getTestplan(project:string,version:string):Promise<Testplan[]>{
        const _url = `${this.url}/${project}/${version}/testplan`;
        console.log(_url)
        return this.http.get(_url)
            .toPromise()
            .then(response => response.json() as Testplan[])
            .catch(this.handleError);
    }

    /*新建一个测试计划*/
    createTestplan(testplan:Testplan):Promise<Testplan>{
        const _url = `${this.url}/api/testplan`;
        return this.http
            .post(_url,JSON.stringify(testplan),{headers:this.headers})
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError)
    }

    /*删除一个测试计划*/
    deleteTestplan(testplanId:string):Promise<Testplan>{
        const _url = `${this.url}/api/testplan/${testplanId}`
        return this.http
            .delete(_url,{headers:this.headers})
            .toPromise()
            .then(response => response.json() as Testplan)
            .catch(this.handleError)
    }

    deleteTestsample(testplanId:string):Promise<Testsample>{
        const _url = `${this.url}/api/testsample/${testplanId}`
        return this.http
            .delete(_url,{headers:this.headers})
            .toPromise()
            .then(response => response.json() as Testsample)
            .catch(this.handleError)
    }

    /*获取Testsample列表*/
    getTestsample(project:string,version:string,testplan:string):Promise<Testsample[]>{
        const _url = `${this.url}/${project}/${version}/${testplan}/testsample`;
        console.log(_url)
        return this.http.get(_url)
            .toPromise()
            .then(response => response.json() as Testsample[])
            .catch(this.handleError);
    }

    /*新建一个测试用例*/
    createTestsample(testsample:Testsample):Promise<Testsample>{
        const _url = `${this.url}/api/testsample`;
        console.log(_url);
        return this.http
            .post(_url,JSON.stringify(testsample),{headers:this.headers})
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError)
    }

    /*获取一个测试用例的详细信息*/
    getSampleDatail(testsampleId:string):Promise<Testsample>{
        const _url = `${this.url}/api/testsample/${testsampleId}`;
        return this.http
            .get(_url)
            .toPromise()
            .then(res => res.json() as Testsample)
            .catch(this.handleError)
    }

    /*更新一个测试用例*/
    updateTestsample(testsample:Testsample){
        const _url = `${this.url}/api/testsample`;
        return this.http
            .put(_url,JSON.stringify(testsample),{headers:this.headers})
            .toPromise()
            .then(()=>testsample)
            .catch(this.handleError)
    }

    /*Get targeted testplan with project version tag : 录制脚本*/
    getTestplansScript(project:string,version:string):Promise<Testplan[]>{
        const _url = `${this.url}/api/${project}/${version}/testplan`;
        return this.http
            .get(_url)
            .toPromise()
            .then(res => res.json() as Testplan [])
            .catch(this.handleError)
    }

    /*Get targeted testsample with project version testplan and tag:录制脚本*/
    getTestsamplesScript(project:string,version:string,testplan:string):Promise<Testsample []>{
        const _url =  `${this.url}/api/${project}/${version}/${testplan}/testsample`;
        return this.http
            .get(_url)
            .toPromise()
            .then(res => res.json() as Testsample [])
            .catch(this.handleError)
    }

    /*错误处理*/
    private handleError(error:any):Promise<any>{
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}