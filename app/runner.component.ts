/**
 * Created by ghj on 16-10-16.
 */
import {Component,OnInit} from '@angular/core';

import {Location} from '@angular/common';
import {ActivatedRoute,Params} from '@angular/router';

import {Testrunner} from './service/testrunner';
import {TestrunnerService} from './service/testrunner.service'

@Component({
    moduleId:module.id,
    selector:'runnerList',
    templateUrl:'runner.component.html',
    styleUrls:['runner.component.css']
})

export class RunnerComponent implements OnInit{
    constructor(
        private route:ActivatedRoute,
        private location:Location,
        private service:TestrunnerService
    ){}

    /*数据结构*/
    testid:string;
    testrunner : Testrunner;
    resultMonkey = ['null'];

    webSocket;

    ngOnInit():void{
        this.route.params.forEach((params:Params)=>{
            let id = params['id']
            this.testid = id;
            this.getDetail(id)
        })

        this.minicap()
    }

    ngOnDestroy():void{
        this.webSocket.close();
    }

    /*获取详细信息*/
    getDetail(id:string){
        this.service.getDetail(id)
            .then(test => {
                this.testrunner = test
                this.resultMonkey = this.testrunner.resultMonkey;

                /*实时获取result的结果*/
                this.getData();
            })
    }

    /*获取运行时刻的data*/
    getData():void{

        var code = setInterval(()=>{

            var tableElement2 = document.getElementById('result');
            tableElement2.scrollTop = tableElement2.scrollHeight;

            this.service.getData(this.testid)
                .then(test =>{
                    this.testrunner = test
                    this.resultMonkey = this.testrunner.resultMonkey;
                    if(this.testrunner.state == 'stop'){
                        console.log("运行结束啦啦啦～")
                        //alert("运行结束啦~")
                        clearInterval(code);
                        console.log('Hello')
                    }
                })
        },2000)

    }

    /*开启minicap的socket*/
    minicap(){
        console.log('HELLO')
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

    /*Fresh*/
    refresh(){
    }

    goBack():void{
        this.location.back();
    }
}