/*
* 实时演示相当于建立了一个运行任务，任务的配置已经固定, 演示时可以选择开始运行进行一次演示
* 但是暂时没有停止运行的，后续可以加上。
* 1、测试Id固定-59783e0ce38a16164693f89d
* 2、测试的设备ID固定-080539a400e358f3
* 虚拟机设备ID:
* */

import {Component,OnInit} from '@angular/core';

import {Testrunner} from './service/testrunner';
import {DeviceService} from './service/device.service';
import {TestdemoService} from './service/testdemo.service';
import {TestrunnerService} from './service/testrunner.service'
import {Configuration} from "./service/configuration";

import 'codemirror/mode/javascript/javascript'

@Component({
    moduleId:module.id,
    selector:'demo',
    templateUrl:'demo.component.html'
})

export  class DemoComponent implements OnInit{

    constructor(
        private service:TestdemoService,
        private serviceT:TestrunnerService,
        private serviceD:DeviceService,
    ){
        this.config = {
            lineNumbers: true,
            mode:{name:"javascript",json:true},
            theme:"dracula"
        };
        this.content = `{
  "blacklist":[
    {"path":"//node[@class='android.support.v7.widget.RecyclerView']"},
    {"path":"//node[@class='android.widget.ImageButton']"},
    {"path":"//node[@class='android.widget.ImageView']"},
    {"path":"//node[@class='android.widget.EditText']"}
  ]
}`

    }

    /*数据结构*/
    testid:string;
    testrunner : Testrunner;
    resultMonkey = ['运行日志'];

    /*
    * config:codemirror的配置项
    * content:代码内容
    * regulation:规则字符串
    * */
    config;
    content:string;
    regulation:JSON;

    ngOnInit():void{

        /*  初始化该测试模型 */
        this.testid = '59783e0ce38a16164693f89d';
        //this.testid = '591e825ffe8a5607a370add9';

        /* 获取测试的详细信息，并且进行初始化 */
        this.initTest(this.testid);

        /* 接收minicao的socket数据流 */
        this.minicap();

    }


    /* 分页使用以及修改页面 */
    flag = true;
    changeFlag(_flag:boolean):void{
        this.flag = _flag;
    }

    /*
    * WebSocket to receive minicap data from server
    * 1. created in ngOnInit
    * 2. destroyed in ngOnDestroy
    * */
    webSocket;


    /*
    * Close the webSocket connection
    * */
    ngOnDestroy():void{
        if(this.webSocket !== undefined)
            this.webSocket.close();
    }

    /* 初始化测试运行
    * 1、获取测试运行的详细信息
    * 2、开启获取运行数据的定时器
    * */
    initTest(id:string){
        this.service.initTestrunner(id)
            .then(test=>{
                this.testrunner = test;
                console.log("打印测试运行的详细信息");
                console.log("测试应用为"+this.testrunner.project)
                console.log('测试设备为'+this.testrunner.deviceId)
                console.log('测试的算法为'+this.testrunner.tag)
                console.log('测试的运行参数为'+this.testrunner.config)
                console.log('测试的运行状态为'+this.testrunner.state)

                if(this.testrunner.state == 'running'){
                    console.log('测试正在运行，可以进行获取数据')
                }
                else{
                    console.log('测试不在运行，暂时没有数据流')
                }
                this.getData();
            })
    }

    /* 开始测试运行 */
    startTest():void{

        if(this.testrunner.state == 'running'){
            alert('测试正在运行，请等待上一次遍历结束')
            return ;
        }

        this.resultMonkey = ['运行过程中的实时数据流'];

        console.log(this.testrunner);

        if(this.saveConfig()) {
            this.service.startTestdemo(this.testid, this.regulation)
                .then(response => {
                    console.log(response);
                    this.testrunner = response
                })
        }
    }

    /* 重启设备: 防止设备运行死机 */
    stopTest():void{
        console.log('Stop test demo.')
        this.service.stopTestdemo(this.testid)
            .then(response =>{
                console.log(response)
            })

    }

    /*获取运行时刻的data*/
    getData():void{

        var code = setInterval(()=>{

            var tableElement2 = document.getElementById('result');
            if(tableElement2 !== null)
                tableElement2.scrollTop = tableElement2.scrollHeight;

            if(this.testrunner.state == 'running') {
                console.log('获取实时数据流');
                this.serviceT.getData(this.testid)
                    .then(test => {
                        this.testrunner = test;
                        this.resultMonkey = test.resultMonkey;

                        if (this.testrunner.state == 'stop') {

                            console.log('结束一次运行，停止获取数据流');
                            //clearInterval(code);
                        }
                    })
            }

        },2000)

    }

    /*开启minicap的socket*/
    minicap(){
        console.log(`Open minicap websocket to ${Configuration.ws}.`);

        var BLANK_IMG =
            'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';

        var canvas = <HTMLCanvasElement>document.getElementById('canvas-device');

        var g = canvas.getContext('2d');

        //var ws = new WebSocket('ws://localhost:8080', 'minicap');

        var ws = new WebSocket(Configuration.ws,'minicap');

        this.webSocket = ws;

        ws.binaryType = 'blob';

        ws.onclose = function() {
            console.log('onclose', arguments)
        };

        ws.onerror = function() {
            console.log('onerror', arguments)
        };

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
            ws.send('360x640/0')
        }
    }

    /*保存规则并且更新到服务器*/
    saveConfig():boolean{
        try {
            this.regulation = JSON.parse(this.content)
            return true
        }catch (exception){
            alert('Invalid JSON Format:\n'+exception)
            return false
        }
    }

    /*
    * 重启应用
    * */
    restartApp():void{
        console.log('restart app');
        if(this.testrunner.state == 'running'){
            alert('测试正在运行，请等待上一次遍历结束')
            return ;
        }
        this.serviceD.fireAction('StartApp me.ele/.Launcher','080539a400e358f3');
    }

}