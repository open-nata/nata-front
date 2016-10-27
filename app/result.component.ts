/**
 * Created by ghj on 16-10-24.
 */
import { Component,OnInit} from '@angular/core';

import {barChart} from './baiduMap'


@Component({
    moduleId:module.id,
    selector: 'result',
    templateUrl:'result.component.html'
})

export class ResultComponent implements OnInit{
    constructor(){}

    ngOnInit():void {
        barChart();
    }

}