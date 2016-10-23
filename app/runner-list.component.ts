/**
 * Created by ghj on 16-10-23.
 */

import {Component,OnInit} from '@angular/core';

import {Router} from '@angular/router';

@Component({
    moduleId:module.id,
    selector:'runner-list',
    templateUrl:'runner-list.component.html',
    styleUrls:['runner-list.component.css']
})

export class RunnerListComponent implements OnInit{

    //Data
    list = ['R','S','S','S','S'];
    selectedRunner:string;

    constructor(
        private router:Router
    ){}

    ngOnInit():void{

    }

    gotoDetail(runner:string){
        this.selectedRunner = runner;
        this.router.navigate(['runner',this.selectedRunner]);
    }
}