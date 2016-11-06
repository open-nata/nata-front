/**
 * Created by ghj on 16-10-14.
 */
import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {Device} from './device';
import {OnlineDevice} from './online-device';

@Injectable()
export class DeviceService{
    private headers = new Headers({'Content-type':'application/json'});
    private url = 'http://localhost:8080';   //URL to nata-server

    constructor(private http:Http){}

    /*获取在线设备列表*/
    getOnlineDevices():Promise<OnlineDevice[]>{
        const _url = `${this.url}/api/devices/online`;
        return this.http.get(_url)
            .toPromise()
            .then(response => response.json() as OnlineDevice[])
            .catch(this.handleError);
    }

    /*获取数据库设备列表*/
    getDevices():Promise<Device[]>{
        const _url = `${this.url}/devices`;
        return this.http.get(_url)
            .toPromise()
            .then(response => response.json() as Device[])
            .catch(this.handleError);
    }

    /*错误处理*/
    private handleError(error:any):Promise<any>{
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}