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
    selectedTestrunner:Testrunner;
    testrunnerList:Testrunner[];

    constructor(
        private router:Router,
        private testService:TestrunnerService
    ){}

    /*初始化：这里应该使用分页机制，下次修改*/
    ngOnInit():void{
        this.getList();
    }

    /*获取数据库运行列表*/
    getList():void{
        this.testService.getList()
            .then(testList => {
                this.testrunnerList = testList.reverse();
                this.testrunnerList.sort(function (element1,element2) {
                    if(Object(element1).create_at.toString() > Object(element2).create_at.toString()){
                        return -1
                    }
                    return 1;
                })
            });
    }

    /*日期*/
    transDate(date:Date){
        const s = date.toString();
        return s.slice(0,16);
    }

    /*查看一次运行的具体情况*/
    gotoDetail(runner:Testrunner){
        const id = (Object)(runner)._id;
        console.log('Testrunner '+id);
        this.router.navigate(['runner',id]);
    }

    /*查看一次运行的具体结果*/
    gotoResult(runner:Testrunner){
        const id = (Object)(runner)._id;
        console.log('Testrunner '+id);
        this.router.navigate(['result',id])
    }

    /*删除一次具体的测试*/
    selectTestrunner(element:Testrunner):void{
        this.selectedTestrunner = element
    }
    deleteTestrunner():void{
        if(!this.selectedTestrunner)
            return alert("删除失败")
        const element = this.selectedTestrunner
        const id = (Object)(element)._id;
        console.log('删除Testrunner '+id);
        this.testService.delete(id)
            .then(response =>{
                this.testrunnerList = this.testrunnerList.filter(h => h!==this.selectedTestrunner)
                this.selectedTestrunner = null
            },err=>{
                alert('删除失败')
            })
    }
}