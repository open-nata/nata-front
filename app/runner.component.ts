/**
 * Created by ghj on 16-10-16.
 */
import {Component,OnInit} from '@angular/core';

import {Location} from '@angular/common';
import {ActivatedRoute,Params} from '@angular/router';


@Component({
    moduleId:module.id,
    selector:'runnerList',
    templateUrl:'runner.component.html'
})

export class RunnerComponent{
    constructor(
        private route:ActivatedRoute,
        private location:Location
    ){}

    ngOnInit():void{

    }

    goBack():void{
        this.location.back();
    }
}