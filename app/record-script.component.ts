/**
 * 编辑一个测试案例的脚本:脚本测试关联特定的设备？
 * 录制时关联一个特定的设备：每次录制认为还是作为Testsample
 * Replay时认为是一次Testrunner吗
 */
import {Component,OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute,Params} from '@angular/router';

import {Testsample} from './service/test.sample';
import {TestplanService} from './service/testplan.service';

import {Device} from './service/device';
import {DeviceService} from './service/device.service';

import {Apk} from './service/apk'
import {ApkService} from './service/apk.service'

@Component({
    moduleId:module.id,
    selector:'record-script',
    templateUrl:'record-script.component.html'
})

export class RecordScriptComponent{
    constructor(
      private route: ActivatedRoute,
      private location:Location,
      private serviceT:TestplanService,
      private serviceD:DeviceService,
      private serviceApk:ApkService

    ){}

    /*数据结构*/
    testSample:Testsample;
    testSampleId:string;    //两个id信息从路由获得

    apk:Apk;
    deviceId:string = "ZTEBV0730";
    device:Device;
    resolutionX:number;
    resolutionY:number;


    webSocket;  //维护一个websocket的全局变量，在组件销毁时关闭socket

    activity;

    // 每次获取的动作列表
    actionList = [];
    // 生产的脚本动作列表
    resultList = [];
    resultTrans = [];

    /*初始化函数*/
    ngOnInit():void{
        this.route.params.forEach((params:Params)=>{
            let id = params['id']
            let deviceId = params['deviceId']
            this.deviceId = deviceId;
            console.log("路由DeviceId "+deviceId)
            this.testSampleId = id;
            this.getDetail(id)
            this.getDevice(deviceId)
        })

        this.deviceMinicap()


    }

    /*获取设备详细信息*/
    getDevice(deviceId:string):void{
        this.serviceD.getDeviceInfo(deviceId)
            .then(res=>{
                this.device = res;
                this.getResolution()
                this.getActivity()
            })
    }

    getResolution():void{
        console.log(this.device.resolution)
        const resolution = this.device.resolution.split('x')
        this.resolutionX = parseInt(resolution[0])/360;
        this.resolutionY = parseInt(resolution[1])/640;
        console.log(resolution)
    }

    /*mouseover事件*/
    mouseover(element:string){

        var canvas = <HTMLCanvasElement>document.getElementById('canvas-device');
        var canvasWrapper = <HTMLCanvasElement>document.getElementById('canvas-wrapper');
        canvasWrapper.width = canvas.width;
        canvasWrapper.height = canvas.height;
        var g = canvasWrapper.getContext("2d");

        /*1080x1920*/
        let index = element.indexOf('@');

        element = element.substr(index+1)
        var coodinates = element.split(/[@,x]/);
        g.lineWidth = 3;
        g.strokeStyle = "red";

        var startX = parseInt(coodinates[0], 10) / this.resolutionX;
        var startY = parseInt(coodinates[1], 10) / this.resolutionY;
        var endX = parseInt(coodinates[2], 10) / this.resolutionX;
        var endY = parseInt(coodinates[3], 10) / this.resolutionY;

        g.strokeRect(startX, startY, endX - startX, endY - startY);
    }

    ngOnDestroy():void{
       this.webSocket.close();
    }

    /*获取详细信息*/
    getDetail(id:string):void{

        /*在每个手机连接时，运行minicap的脚本，在获取详细信息时 adb forward 1717*/
        this.serviceT.getSampleDatail(this.testSampleId)
            .then(res => this.testSample = res,
                err => alert(err))
            .then(()=> {
                console.log(this.testSample)
                this.getApkDetail()
            })

    }
    /*获取Apk详细信息*/
    getApkDetail():void{
        this.serviceApk.getApk(this.testSample.project,this.testSample.version)
            .then(res => this.apk = res)
    }

    /*获取界面动作*/
    getActions(){
        this.serviceD.getActions(this.deviceId)
            .then(actions => this.actionList = actions)
    }

    /*获取当前的Activity*/
    getActivity(){
        this.serviceD.getActivity(this.deviceId)
            .then(activity => this.activity = activity)
    }

    /*清楚上一条动作*/
    removeLast(){
        const action1 = this.resultList.pop();
        const action2 = this.resultTrans.shift();
        if(action1 !== action2)
            alert("Remove last action error")
    }

    /*清楚所有动作*/
    removeAll(){
        this.resultList = [];
        this.resultTrans = [];
    }

    /*返回：执行一次返回动作*/
    fireBack():void{
        this.fireAction('Back')
    }

    /*Home:执行一次Home*/
    fireHome():void{
        this.fireAction('Home')
    }

    /*Menu:执行一次Menu操作*/
    fireMenu():void{
        this.fireAction('Menu')
    }

    /*StartApp*/
    restartApp():void{
        this.fireAction(`StartApp ${this.apk.package}/${this.apk.activity}`)
    }

    /*CleanData*/
    cleanData():void{
        this.fireAction(`CleanData ${this.apk.package}`)
    }

    /*保存录制结果:暂时认为每一份录制的脚本是一个测试sample，不是一次测试运行，但是每一次的replay是一次测试运行*/
    saveSample():void{
        let resultString:string = '';
        for(let i = 0 ; i < this.resultList.length; i++){
            console.log(this.resultList[i])
            resultString = resultString.concat(this.resultList[i]);
            resultString = resultString.concat('##');
        }
        console.log(resultString)

        this.testSample.script = resultString;

        this.serviceT.updateTestsample(this.testSample)
            .then(res => {
                    console.log(res)
                    this.goBack()
                },
                err=> alert(err)
            )
    }


    /*触发一条动作*/
    fireAction(action:string):void{
        console.log(action);
        /*分析action*/
        var params = action.split(' ');
        var actionType = params[0];
        switch (actionType){
            case 'TextInput':
                var textInput = prompt("请输入文本内容","")
                params[2] = textInput;
                action = `${params[0]} ${params[1]} ${params[2]}`
                break;
            default:break;
        }
        console.log(action)
        this.serviceD.fireAction(action,this.deviceId)
            .then(response=>{
                this.resultList.push(action)
                this.resultTrans.unshift(action)

                this.getActions()
                this.getActivity()
                /*获取下一次的动作列表*/
                //this.getActions();
            },err=>{
                alert(err)
            })
    }

    /*选择Device的Minicap数据流*/
    deviceMinicap():void{
        this.serviceD.minicap(this.deviceId)
            .then(res=>{
                console.log(res)

                this.minicap()
            },err=>{
                alert(err)
            })
    }

    /*开启minicap*/
    minicap():void{
        var BLANK_IMG =
            'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='

        var canvas = <HTMLCanvasElement>document.getElementById('canvas-device');

        var g = canvas.getContext('2d')

        var ws = new WebSocket('ws://localhost:8080', 'minicap')

        this.webSocket = ws;

        ws.binaryType = 'blob'

        ws.onclose = function() {
            console.log('onclose', arguments)
        }

        ws.onerror = function() {
            console.log('onerror', arguments)
        }

        ws.onmessage = function(message) {
            var blob = new Blob([message.data], {type: 'image/jpeg'})
            var URL = window.URL || (window as any).webkitURL
            var img = new Image()
            img.onload = function() {
                console.log(img.width, img.height)
                canvas.width = img.width
                canvas.height = img.height
                g.drawImage(img, 0, 0)
                img.onload = null
                img.src = BLANK_IMG
                img = null
                u = null
                blob = null
            }
            var u = URL.createObjectURL(blob)
            img.src = u
        }

        ws.onopen = function() {
            console.log('onopen', arguments)
            ws.send('480x270/0')
        }
    }

    /*路由返回*/
    goBack():void{
        this.location.back()
    }

}