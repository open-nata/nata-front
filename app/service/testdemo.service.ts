import {Injectable} from '@angular/core';
import {Headers,Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {Testrunner} from './testrunner';
import {Testsample} from './test.sample';
import  {Configuration} from './configuration'

@Injectable()
export class TestdemoService{

    private headers = new Headers({'Content-type':'application/json'});

    // private url = 'http://localhost:8080';  //URL to nata-server
    private url = Configuration.url;


    constructor(private http:Http){

    }



    /* 获取测试运行的详细，并且进行初始化操作 */
    initTestrunner(testid:string):Promise<Testrunner>{
        const _url =  `${this.url}/api/testdemo/${testid}`
        return this.http
            .get(_url)
            .toPromise()
            .then(response=> response.json() as Testrunner)
            .catch(this.handleError)

    }

    /* 停止当前正在运行的测试 */
    stopTestdemo(testid:string):Promise<any>{
        const _url = `${this.url}/api/testdemo/stop/${testid}`;
        return this.http
            .get(_url)
            .toPromise()
            .then(res => res)
            .catch(this.handleError)

    }

    /* 开始当前正在运行的测试 */
    startTestdemo(testid:string,regulation:JSON):Promise<Testrunner>{
        const _url =  `${this.url}/api/testdemo/${testid}`;

        return this.http
            .post(_url,regulation,{headers:this.headers})
            .toPromise()
            .then(response => response.json() as Testrunner)
            .catch(this.handleError)
    }

    /* 错误处理 */
    private handleError(error:any):Promise<any>{
        console.log("An error occurred",error);
        return Promise.reject(error.message || error)
    }

}