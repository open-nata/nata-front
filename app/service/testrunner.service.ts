/**
 * Created by ghj on 16-11-23.
 */

import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {Testrunner} from './testrunner'
import {Testsample} from './test.sample'

@Injectable()
export class TestrunnerService{

    private headers = new Headers({'Content-type':'application/json'});
    private url = 'http://localhost:8080';   //URL to nata-server

    constructor(private http:Http){
    }

    /*获取数据库所有运行设备列表*/
    getList():Promise<Testrunner[]>{
        const _url = `${this.url}/testrunners`;
        return this.http.get(_url)
            .toPromise()
            .then(response=> response.json() as Testrunner[])
            .catch(this.handleError)
    }

    /*创建一个测试运行*/
    create(test:Testrunner):Promise<Testrunner>{
        const _url = `${this.url}/api/testrunner`;
        return this.http
            .post(_url,JSON.stringify(test),{headers:this.headers})
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError)
    }

    /*删除一次测试运行*/
    delete(testid:string):Promise<void>{
        const _url = `${this.url}/api/testrunner/${testid}`;
        return this.http.delete(_url,{headers:this.headers})
            .toPromise()
            .then(()=>null)
            .catch(this.handleError)
    }

    /*获取一个正在运行的测试的数据*/
    getData(testid:string):Promise<Testrunner>{
        const _url = `${this.url}/api/testrunner/${testid}`;
        return this.http.get(_url)
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError)
    }
    /*获取一个正在运行的测试的详细信息*/
    getDetail(testid:string):Promise<Testrunner>{
        const _url = `${this.url}/api/testrunners/${testid}`;
        return this.http.get(_url)
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError)
    }


    /*保存结果到Github数据库*/
    save(testid:string):Promise<Testrunner>{
        const _url = `${this.url}/api/testrunner/${testid}`;
        return this.http.post(_url,JSON.stringify({testid:testid}),{headers:this.headers})
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError)
    }

    /*获取有关一个测试用例的所有运行*/
    getTargetList(testSample:Testsample):Promise<Testrunner []>{
        const _url = `${this.url}/api/testrunners`;
        return this.http.post(_url,JSON.stringify(testSample),{headers:this.headers})
            .toPromise()
            .then(res => res.json() as Testrunner[])
            .catch(this.handleError)
    }

    /*错误处理*/
    private handleError(error:any):Promise<any>{
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
