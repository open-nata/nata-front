/*重新运行一个录制脚本地的测试用例：
* 思考的问题是：需不需要将一次replay作为一次TestRunner
* 最后的选择是每次replay作为一次Testrunner保存下来*/

import {Component,OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute,Params} from '@angular/router';

import {Testsample} from './service/test.sample';
import {Testrunner} from './service/testrunner';
import {TestplanService} from './service/testplan.service';

import {DeviceService} from './service/device.service';

@Component({
    moduleId:module.id,
    selector:'replay-script',
    templateUrl:'replay-script.component.html'
})

export class ReplayScriptComponent{
    constructor(
        private route: ActivatedRoute,
        private location:Location,
        private serviceT:TestplanService,
        private serviceD:DeviceService
    ){}

    /*数据结构*/
    testSample:Testsample;
    testSampleId:string;    //两个id信息从路由获得

    deviceId:string;

    webSocket;  //保存一个websocket的全局变量

    // 动作列表
    actionList = [];

    /*初始化函数*/
    ngOnInit():void{
        this.route.params.forEach((params:Params)=>{
            let id = params['id']
            this.testSampleId = id;

            let deviceId = params['deviceId']
            this.deviceId = deviceId;
            console.log("路由DeviceId "+deviceId)
            this.getDetail(id)
        })

        this.deviceMinicap()
        //this.minicap()
    }

    ngOnDestroy():void{
        this.webSocket.close();
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

    /*获取详细信息*/
    getDetail(id:string):void{
        /*在每个手机连接时，运行minicap的脚本，在获取详细信息时 adb forward 1717*/
        this.serviceT.getSampleDatail(this.testSampleId)
            .then(res => this.testSample = res,
                err => alert(err))
            .then(()=> {
                console.log(this.testSample)
                this.stringToArray();
            })
    }

    /*获取动作*/
    stringToArray():void{
        let str = this.testSample.script;
        this.actionList = str.split('##');
        this.actionList.pop()
    }

    /*触发动作*/
    fireAction():void{
        let action = this.actionList.shift()
        this.serviceD.fireAction(action,this.deviceId)
            .then(res =>{

            },err=>{
                alert("单步执行失败")
                this.actionList.push(action)
            })
    }

    /*触发所有动作*/
    fireActions():void{
        alert("确认全部执行吗？中途不能中断...")
        this.serviceD.fireActions(this.actionList,this.deviceId)
            .then(res=>{
                alert("全部执行完成")
            },err=>{
                alert("全部执行失败")
            })
    }

    /*返回路由*/
    back():void{
        this.location.back();
    }
}