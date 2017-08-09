/**
 * Created by ghj on 16-10-14.
 */
import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {Device} from './device';
import {OnlineDevice} from './online-device';

import {Configuration}  from './configuration'

@Injectable()
export class DeviceService{
    private headers = new Headers({'Content-type':'application/json'});
    //private url = 'http://localhost:8080';   //URL to nata-server

    private url = Configuration.url;
    constructor(private http:Http){}

    /*获取在线设备列表*/
    getOnlineDevices():Promise<OnlineDevice[]>{
        const _url = `${this.url}/api/devices`;
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

    /*获取设备详细信息*/
    getDeviceInfo(deviceId:string):Promise<Device>{
        const _url = `${this.url}/api/device/${deviceId}`;
        return this.http.get(_url)
            .toPromise()
            .then(res => res.json() as Device)
            .catch(this.handleError)
    }

    /*更新设备信息*/
    updateDevice(device:Device):Promise<Device>{
        const _url = `${this.url}/api/devices/${device.id}`;
        return this.http.put(_url,JSON.stringify(device),{headers:this.headers})
            .toPromise()
            .then(response => response.json() as Device)
            .catch(this.handleError)
    }

    /*添加设备*/
    createDevice(device:OnlineDevice){
        const _url = `${this.url}/api/devices/${device.id}`;
        return this.http
            .post(_url, JSON.stringify({device: OnlineDevice}), {headers: this.headers})
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }

    /*删除设备*/
    deleteDevice(device:Device){
        const _url = `${this.url}/api/devices/${device.id}`;
        return this.http
            .delete(_url, {headers: this.headers})
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    /*获取所有的动作*/
    getActions(device:string):Promise<any>{
        const _url = `${this.url}/api/devices/${device}/actions`;
        return this.http
            .get(_url)
            .toPromise()
            .then((actions) => actions.json())
            .catch(this.handleError);
    }

    /*获取当前的Activity*/
    getActivity(device:string):Promise<any>{
        const _url = `${this.url}/api/devices/${device}/activity`
        return this.http
            .get(_url)
            .toPromise()
            .then((activity) => activity.json())
            .catch(this.handleError)
    }

    /*触发单个动作*/
    fireAction(action:string,device:string):Promise<any>{
        const _url = `${this.url}/api/devices/${device}/action`;
        return this.http
            .post(_url, JSON.stringify({action: action}), {headers: this.headers})
            .toPromise()
            .then(res => res)
            .catch(this.handleError);
    }

    /*触发所有动作*/
    fireActions(actions:string[],device:string):Promise<any>{
        const _url = `${this.url}/api/devices/${device}/actions`;
        return this.http
            .post(_url,JSON.stringify({actions:actions}),{headers:this.headers})
            .toPromise()
            .then(res=>res)
            .catch(this.handleError)
    }


    /*开启某个Minicap的数据流*/
    minicap(deviceId:string):Promise<any>{
        const _url = `${this.url}/api/devices/${deviceId}`;
        return this.http
            .get(_url)
            .toPromise()
            .then(res => res)
            .catch(this.handleError)
    }

    // /*触发BACK操作*/
    // fireBack(device:string):Promise<any>{
    //     const _url = `${this.url}/api/device/${device}/back`;
    //     return this.http
    //         .post(_url,JSON.stringify({action:'Back'}),{headers:this.headers})
    //
    //
    // }

    /*错误处理*/
    private handleError(error:any):Promise<any>{
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}