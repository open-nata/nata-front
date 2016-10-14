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

    ngOnInit():void{

    }
}