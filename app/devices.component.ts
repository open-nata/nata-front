/**
 * Created by ghj on 16-10-14.
 */
import {Component,OnInit} from '@angular/core';
import {Router} from '@angular/router';

//Device Service
import {Device} from './service/device';
import {OnlineDevice} from './service/online-device';
import {DeviceService} from './service/device.service';

@Component({
    moduleId:module.id,
    selector:'devices',
    templateUrl:'devices.component.html',
    styleUrls:['devices.component.css']
})

export class DevicesComponent implements  OnInit{
    //Devices
    onlineDevices:OnlineDevice[];
    devices:Device[];

    constructor(
        private deviceService: DeviceService,
        private router : Router ){}

    p = [1,2,3,4,5,6,7,8,9,10,11];

    seletedP:number;

    getOnlineDevices():void{
        this.deviceService
            .getOnlineDevices()
            .then(response => this.onlineDevices = response);
    }

    getDevices():void{
        this.deviceService
            .getDevices()
            .then(response => this.devices = response);

    }
    ngOnInit():void{
    }

    showDetail(ele:number):void{
        this.seletedP = ele;
    }

    get():void{
        this.getOnlineDevices();
        this.getDevices();
        for(let i = 0 ; i < this.devices.length; i++){
            console.log(this.devices[i]);
        }
    }
}