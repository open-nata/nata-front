/**
 * Created by ghj on 16-10-16.
 */

import {Component,OnInit} from '@angular/core';
import {ActivatedRoute,Params} from '@angular/router';
import {Location} from '@angular/common';

@Component({
    moduleId:module.id,
    selector:'project-manager',
    templateUrl:'project-manager.component.html'
})

export class ProjectManagerComponent{
    constructor(
        private route:ActivatedRoute,
        private location:Location
    ){}

    name:string;

    version = '2.3.1';
    versions= ['2.3.0','2.3.1','2.3.2','2.3.3','2.3.4','2.3.5',
        '2.4.0','2.4.1','2.4.2','2.4.3','2.4.4','2.4.5',
        '2.5.0','2.5.1','2.5.2','2.5.3','2.5.4','2.5.5'];

    //For page list
    startPage = 0;
    allPage = this.versions.length/4;
    versionDisplay = this.versions.slice(0,4);

    //For Test Plan
    testPlanList = ['Monkey压测','脚本测试','进化测试'];
    selectedPlan = this.testPlanList[0];
    sampleList = ['测试用例','测试用例二','登录成功','1000次'];
    selectedSample = this.sampleList[0];
    runnerList = ['1','2','3','4','5'];

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

    selectTestplan(s):void{
        document.getElementById(this.selectedPlan).className = "list-group-item";
        this.selectedPlan = s;
        document.getElementById(s).className = "list-group-item active";
    }

    selectSample(s):void{
        document.getElementById(this.selectedSample).className = "list-group-item";
        this.selectedSample = s;
        document.getElementById(s).className = "list-group-item active";
    }

    ngOnInit():void{
        this.route.params.forEach((params: Params) => {
            this.name = params['name'];
        });
    }

    addTestPlan():void{
    }
    back():void{
        this.location.back();
    }
}
