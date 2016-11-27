/**
 * Created by ghj on 16-10-24.
 */
import { Component,OnInit} from '@angular/core';

/*用于测试Ｅｃｈａｒｔ模块*/
import {barChart} from './baiduMap'

//
import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Component({
    moduleId:module.id,
    selector: 'result',
    templateUrl:'result.component.html'
})

@Injectable()
export class ResultComponent implements OnInit{
    constructor(private http:Http){}

    ngOnInit():void {
        barChart();
        //this.test();
        this.hello();

        this.hello2()
    }

    hello2(){
        setInterval(function(){
            console.log('HELLO')
        },2000)
    }

    hello(){
        console.log('HELLO')
        var BLANK_IMG =
            'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='

        var canvas = <HTMLCanvasElement>document.getElementById('canvas');

        var g = canvas.getContext('2d')

        var ws = new WebSocket('ws://localhost:8080', 'minicap')
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


}