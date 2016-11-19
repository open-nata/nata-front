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
    /*Devices:在线设备列表和数据库设备列表*/
    onlineDevices:OnlineDevice[];
    devices:Device[];

    constructor(
        private deviceService: DeviceService,
        private router : Router ){}

    selectedDevice:Device;

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
        this.getDevices();
        this.getOnlineDevices();
    }

    showDetail(device:Device):void{
        console.log(device.id)
        this.selectedDevice = device;
    }

    get():void{
        for(let i = 0 ; i < this.devices.length; i++){
            console.log(this.devices[i]);
        }
        for(let i = 0 ; i < this.onlineDevices.length; i++){
            console.log(this.onlineDevices[i]);
        }
    }
}