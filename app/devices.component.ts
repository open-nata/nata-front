/**
 * Created by ghj on 16-10-14.
 */
import {Component,OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    moduleId:module.id,
    selector:'devices',
    templateUrl:'devices.component.html',
    styleUrls:['devices.component.css']
})

export class DevicesComponent implements  OnInit{
    constructor(
        private router :Router ){}

    p = [1,2,3,4,5,6,7,8,9,10,11];

    ngOnInit():void{

    }
}