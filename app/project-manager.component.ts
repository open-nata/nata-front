
import {Component,OnInit} from '@angular/core';
import {ActivatedRoute,Params,Router} from '@angular/router';
import {Location} from '@angular/common';


import {Testplan} from './service/testplan';
import {Testsample} from './service/test.sample';

import {Project} from './service/project';
import {Apk} from './service/apk';

import {ApkService} from './service/apk.service';
import {ProjectService} from './service/project.service';
import {TestplanService} from './service/testplan.service';

@Component({
    moduleId:module.id,
    selector:'project-manager',
    templateUrl:'project-manager.component.html'
})

export class ProjectManagerComponent{
    constructor(
        private router:Router,
        private location:Location,
        private route:ActivatedRoute,
        private apkService:ApkService,
        private projectService:ProjectService,
        private testplanService:TestplanService
    ){}

    /*数据结构*/
    projectName:string;
    project:Project;

    /*Apk version*/
    selectedVersion:Apk;
    versionList:Apk[];
    createVersion:Apk = {name:'name',version:'v0.0',package:'com.cvicse.zhnt',activity:'.LoadingActivity',describe:'该版本...'}

    /*Testplan*/
    testplanList:Testplan[];
    selectedTestplan:Testplan;
    testTagList:string[] = ['Monkey','DFS遍历','录制脚本'];
    createTestplan:Testplan = {
        project:'null',
        version:'null',
        name:'name',
        describe:'describe',
        manager:'manager',
        tag:'monkey'
    };

    /*Testsample*/
    testsampleList:Testsample[];
    selectedTestsample:Testsample;
    createTestsample:Testsample = {
        project:'null',
        version:'null',
        testplan:'null',
        name:'name',
        describe:'describe',
        manager:'manager',
        tag:'null',
        config:'null',
        script:'null',
    }

    /*初始化*/
    ngOnInit():void{

        /*Project Name*/
        this.route.params.forEach((params: Params) => {
            this.projectName = params['name'];
        });

        /*获取project详细信息*/
        this.getProject();

        /*获取apk列表*/
        this.getVersion();
    }

    /*获取项目*/
    getProject(){
        this.projectService.getProject(this.projectName)
            .then(response => this.project = response)
    }

    /*获取项目的不同版本*/
    getVersion(){
        this.apkService.getApks(this.projectName)
            .then(response => {
                this.versionList = response
                if(this.versionList.length === 0){
                    //no apk in the list
                }else{
                    this.selectedVersion = this.versionList[0]
                    this.getTestplan()
                }
            })
    }

    /*添加版本*/
    addApkVersion():void{
        this.createVersion.name = this.projectName
        this.apkService.createApk(this.createVersion)
            .then(response => {
                this.versionList.push(response)
                if(this.versionList.length === 1){
                    this.selectedVersion = response
                }
            })
    }

    /*删除版本*/
    deleteApk(element:Apk):void{
        this.apkService.deleteApk(element)
            .then(() => {
                this.versionList = this.versionList.filter(apk => apk !== element)
                if (this.selectedVersion === element){
                    this.selectedVersion = null
                }
        })
    }

    /*选择一个特定的版本*/
    selectVersion(element:Apk):void{
        this.selectedVersion = element;
        this.getTestplan()
        this.selectedTestplan = null
    }

    /*删除项目*/
    deleteProject(){
        this.projectService.deleteProject(this.projectName)
            .then(()=>this.back())
    }

    /*更新项目*/
    updateProject(){
        this.projectService.updateProject(this.project)
            .then(response => {
                this.project = response
                alert('更新成功')
            })
    }

    /*获取测试计划*/
    getTestplan():void{
        this.testplanService
            .getTestplan(this.projectName,this.selectedVersion.version)
            .then(testplans => this.testplanList = testplans );
    }

    /*新建测试计划*/
    addTestplan():void{

        /*获取标签*/
        const select = document.getElementById('selectTestTag') as HTMLSelectElement;
        const selectedIndex = select.selectedIndex;
        console.log(selectedIndex);
        this.createTestplan.tag = this.testTagList[selectedIndex];

        this.createTestplan.project = this.projectName;
        this.createTestplan.version = this.selectedVersion.version;
        this.testplanService
            .createTestplan(this.createTestplan)
            .then(testplan =>{
                this.testplanList.push(testplan)
            },err=>{
                alert("请检查测试计划的名称是否重复")
            })
    }

    /*选择测试计划*/
    selectTestplan(testplan:Testplan):void{
        if(this.selectedTestplan)
            document.getElementById(this.selectedTestplan.name).className = "list-group-item";
        this.selectedTestplan = testplan;
        document.getElementById(testplan.name).className = "list-group-item active";

        /*获取关联测试计划的测试用例*/
        this.getTestsample();
        this.selectedTestsample = null;
    }

    /*删除测试计划*/
    deleteTestplan(testplan:Testplan):void{
        const object = (Object)(testplan)
        const testplanId = object._id
        this.testplanService.deleteTestplan(testplanId)
            .then(response => {
                this.testplanList = this.testplanList.filter(ele=>ele!==testplan)
                if(this.selectedTestplan === testplan)
                    this.selectedTestplan = null
                    this.testsampleList = null
            }, err => {
                alert('删除测试计划失败')
            })
    }

    /*删除测试用例*/
    deleteTestsample(testplan:Testsample):void{
        const object = (Object)(testplan)
        const testplanId = object._id
        this.testplanService.deleteTestsample(testplanId)
            .then(response => {
                this.testsampleList = this.testsampleList.filter(ele=>ele!==testplan)
            }, err => {
                alert('删除测试用例失败')
            })
    }

    /*获取测试用例*/
    getTestsample():void{
        this.testplanService
            .getTestsample(this.projectName,this.selectedVersion.version,this.selectedTestplan.name)
            .then(testsamples => this.testsampleList = testsamples);
    }

    /*新建测试用例*/
    addTestsample():void{
        if(!this.selectedTestplan){
            return alert("请先选择一个测试计划")
        }

        this.createTestsample.project = this.selectedTestplan.project;
        this.createTestsample.version = this.selectedTestplan.version;
        this.createTestsample.testplan = this.selectedTestplan.name;
        this.createTestsample.tag = this.selectedTestplan.tag;
        this.testplanService
            .createTestsample(this.createTestsample)
            .then(testsample =>{
                this.testsampleList.push(testsample);
            },err=>{
                alert("请检查测试用例名称是否重复")
            })
    }

    /*控制页面:config,edit,history*/
    controlNav :string = 'config';
    selectNav(select:string):void{
        this.controlNav = select;
    }

    /*控制页面是apk管理还是测试计划*/
    pageSelect = 'page2';
    selectPage(page:string):void{
        this.pageSelect = page
    }

    /*删除项目之后回退*/
    back():void{
        this.location.back();
    }

    /*路由：查看一个具体的测试用例*/
    gotoTestsample(element:Testsample):void{
        const trans = (Object)(element);
        const testsampleId = trans._id;
        this.router.navigate(['testsample',testsampleId])
    }
}


//For page list
// startPage = 0;
// allPage = this.versions.length/4;
// versionDisplay = this.versions.slice(0,4);
// prePage():void{
//     if(this.startPage > 0){
//         this.startPage --;
//     }
// }
// nextPage():void{
//     if(this.startPage + 5 > this.allPage)
//         return;
//     this.startPage ++;
// }
//
// getVersions(currentPage:number):void{
//     //Each page display 4 apks
//     let index = (currentPage -1)*4;
//     this.versionDisplay = this.versions.slice(index,index+4);
// }
//
// selectVersion(v:string):void{
//     this.version = v;
// }