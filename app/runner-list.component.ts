/**
 * Created by ghj on 16-10-23.
 */

import {Testrunner} from './service/testrunner';
import {TestrunnerService} from './service/testrunner.service';

import {Component,OnInit} from '@angular/core';

import {Router} from '@angular/router';

@Component({
    moduleId:module.id,
    selector:'runner-list',
    templateUrl:'runner-list.component.html',
    styleUrls:['runner-list.component.css']
})

export class RunnerListComponent implements OnInit{

    /*数据结构*/
    testrunnerList:Testrunner[];

    constructor(
        private router:Router,
        private testService:TestrunnerService

    ){}

    ngOnInit():void{
        this.getList();
    }

    /*获取数据库运行列表*/
    getList():void{
        this.testService.getList()
            .then(testList => {
                this.testrunnerList = testList;
            });
    }

    /*日期*/
    transDate(date:Date){
        const s = date.toString();
        return s.slice(0,16);
    }

    /*查看一次运行的具体情况*/
    gotoDetail(runner:Testrunner){
        const id = runner._id;
        console.log('Testrunner '+id);
        this.router.navigate(['runner',id]);
    }

    /*查看一次运行的具体结果*/
    gotoResult(runner:Testrunner){
        const id = runner._id;
        console.log('Testrunner '+id);
        this.router.navigate(['result',id])
    }
}