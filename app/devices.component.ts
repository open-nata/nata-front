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

    private url = "http://localhost:8080/device-tag/";

    /*Devices:在线设备列表和数据库设备列表*/
    onlineDevices:OnlineDevice[];
    devices:Device[];

    /*统计信息*/
    onlineNumber:number;
    totalNumber:number;
    freeNumber:number;

    /*设备标签*/
    deviceTagList = ['iPhone','ZTE','小米','华为'];
    selectedDevice:Device;

    /*管理页面*/
    display:boolean = true;

    constructor(
        private deviceService: DeviceService,
        private router : Router ){}



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

    /*更新设备信息*/
    updateDevice(){
        const select = document.getElementById('selectDeviceTag') as HTMLSelectElement;
        const selectedIndex = select.selectedIndex;
        console.log(selectedIndex);
        this.selectedDevice.tag = this.deviceTagList[selectedIndex];
        console.log(this.selectedDevice.tag);
        this.deviceService.updateDevice(this.selectedDevice);
    }
    /*添加设备信息：将一个设备的信息添加到数据库*/
    createDevice(device:OnlineDevice){
        this.deviceService.createDevice(device)
            .then(response =>{
                console.log(response)
                this.devices.push(response)
            },err=>{
                alert("请检查设备是否存在")
            })
    }

    /*删除设备信息：将一个设备从数据库删除*/
    deletedDevice : Device;
    selectDeleteDevice(device:Device){
        this.deletedDevice = device;
    }
    deleteDevice():void{
        this.deviceService.deleteDevice(this.deletedDevice)
            .then(() => {
                this.devices = this.devices.filter(h => h !== this.deletedDevice);
                if (this.selectedDevice === this.deletedDevice) { this.selectedDevice = null; }
            });
    }


    /*选择并且查看设备详细信息*/
    showDetail(device:Device):void{
        console.log(device.id)
        this.selectedDevice = device;
    }

    /*选择页面*/
    selectDisplay(_display:boolean){
        this.display = _display;
    }

    /*刷新在线设备*/
    refresh(){
        this.getOnlineDevices();
    }

    getBusyDevice(){
        return 0;
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