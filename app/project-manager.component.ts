/**
 * Created by ghj on 16-10-16.
 */

import {Component,OnInit} from '@angular/core';
import {ActivatedRoute,Params} from '@angular/router';
import {Location} from '@angular/common';

import {Testplan} from './service/testplan';
import {Testsample} from './service/test.sample';
import {TestplanService} from './service/testplan.service';

@Component({
    moduleId:module.id,
    selector:'project-manager',
    templateUrl:'project-manager.component.html'
})

export class ProjectManagerComponent{
    constructor(
        private route:ActivatedRoute,
        private location:Location,
        private testplanService:TestplanService
    ){}

    /*数据结构*/
    projectName:string;
    selectedVersion:string = 'v4.1';

    selectedTestplan:Testplan;
    createTestplan:Testplan = {
        project:'null',
        version:'null',
        name:'name',
        describe:'describe',
        manager:'ghj',
        tag:'monkey'
    };
    selectedTestsample:Testsample;
    createTestsample:Testsample = {
        project:'null',
        version:'null',
        testplan:'null',
        name:'name',
        describe:'describe',
        manager:'ghj',

        config:'null',
        script:'null'
    }

    //在线设备列表


    //apkList
    testplanList:Testplan[];
    testsampleList:Testsample[];

    /*数据结构*/

    ngOnInit():void{

        /*Project Name*/
        this.route.params.forEach((params: Params) => {
            this.projectName = params['name'];
        });

        /*Apk list*/
        /**/

        /*Test plan*/
        this.getTestplan();
        if(this.testplanList)
            this.selectedTestplan = this.testplanList[0];

        /*Test sample*/
        if(this.selectedTestplan)
            this.getTestsample();
    }

    /*获取测试计划*/
    getTestplan():void{
        this.testplanService
            .getTestplan(this.projectName,this.selectedVersion)
            .then(testplans => this.testplanList = testplans);
        if(this.testplanList)
            this.selectedTestplan = this.testplanList[0];
    }

    /*新建测试计划*/
    addTestplan():void{
        this.createTestplan.project = this.projectName;
        this.createTestplan.version = this.selectedVersion;
        this.testplanService
            .createTestplan(this.createTestplan)
            .then(testplan =>{
                this.testplanList.push(testplan)
            })
    }

    /*获取测试用例*/
    getTestsample():void{
        this.testplanService
            .getTestsample(this.projectName,this.selectedVersion,this.selectedTestplan.name)
            .then(testsamples => this.testsampleList = testsamples);
        this.selectedTestsample = null;
    }

    /*新建测试用例*/
    addTestsample():void{
        this.createTestsample.project = this.projectName;
        this.createTestsample.version = this.selectedVersion;
        this.createTestsample.testplan = this.selectedTestplan.name;
        this.testplanService
            .createTestsample(this.createTestsample)
            .then(testsample =>{
                this.testsampleList.push(testsample);
            })
    }
    /*选择测试计划*/
    selectTestplan(testplan:Testplan):void{
        console.log(this.selectedTestplan);
        if(this.selectedTestplan)
            document.getElementById(this.selectedTestplan.name).className = "list-group-item";
        this.selectedTestplan = testplan;
        document.getElementById(testplan.name).className = "list-group-item active";
        this.getTestsample();
    }
    /*选择测试用例*/
    selectTestsample(testsample:Testsample):void{
        console.log(this.selectedTestsample);
        if(this.selectedTestsample)
            document.getElementById(`sample${this.selectedTestsample.name}`).className = "list-group-item";
        this.selectedTestsample = testsample;
        document.getElementById(`sample${testsample.name}`).className = "list-group-item active";
    }



    version = '2.3.1';
    versions= ['v4.1','2.3.0','2.3.1','2.3.2','2.3.3','2.3.4','2.3.5',
        '2.4.0','2.4.1','2.4.2','2.4.3','2.4.4','2.4.5',
        '2.5.0', '2.5.1','2.5.2','2.5.3','2.5.4','2.5.5'];

    //For page list
    startPage = 0;
    allPage = this.versions.length/4;
    versionDisplay = this.versions.slice(0,4);


    //For Edit or Config
    editConfig = true;
    selectActive(flag:boolean):void{
        this.editConfig = flag;
    }

    testplan = false;
    displayTestPlan():void{
        this.testplan = true;
    }
    displayApkManager():void{
        this.testplan = false;
    }

    prePage():void{
        if(this.startPage > 0){
            this.startPage --;
        }
    }
    nextPage():void{
        if(this.startPage + 5 > this.allPage)
            return;
        this.startPage ++;
    }

    getVersions(currentPage:number):void{
        //Each page display 4 apks
        let index = (currentPage -1)*4;
        this.versionDisplay = this.versions.slice(index,index+4);
    }

    selectVersion(v:string):void{
        this.version = v;
    }

    back():void{
        this.location.back();
    }
}
