/**
 * Created by ghj on 16-10-14.
 */
import {Component,OnInit} from '@angular/core';
import {Router} from '@angular/router';

/*Device Service*/
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

    /*Device Image Url */
    private url = "http://localhost:8080/device-tag/";

    /*Devices:在线设备列表和数据库设备列表,统计信息*/
    onlineDevices:OnlineDevice[];
    devices:Device[];
    freeNumber:number;

    /*设备标签*/
    deviceTagList = ['iPhone','ZTE','小米','华为'];
    selectedDevice:Device;

    /*管理页面*/
    display:boolean = true;
    selectDisplay(_display:boolean){
        this.display = _display;
    }

    constructor(
        private deviceService: DeviceService,
        private router : Router ){}

    /*初始化：获取在线设备和数据库设备*/
    ngOnInit():void{
        this.getDevices();
        this.getOnlineDevices();

    }
    getOnlineDevices():void{
        this.deviceService
            .getOnlineDevices()
            .then(response => {
                this.onlineDevices = response;
            });
    }

    getDevices():void{
        this.deviceService
            .getDevices()
            .then(response => {
                this.devices = response;
                if(this.devices.length > 0) {
                    this.selectedDevice = this.devices[0];
                    this.getBusyDevice();
                }
            });
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
                if (this.selectedDevice === this.deletedDevice) {
                    this.selectedDevice = null;
                    console.log(this.selectedDevice)
                }
            });
    }

    /*选择并且查看设备详细信息*/
    showDetail(device:Device):void{
        console.log(device.id)
        this.selectedDevice = device;
    }

    /*刷新在线设备*/
    refresh(){
        this.getOnlineDevices();
    }

    /*获取正在运行的设备数目*/
    getBusyDevice():void{
        let count = 0;
        for(let device of this.devices){
            if(device.state == 'busy')
                count ++;
        }
        this.freeNumber = count;
    }

}