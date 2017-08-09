/*Testsample*/

import {Component,OnInit} from '@angular/core'
import {ActivatedRoute, Params ,Router} from '@angular/router'
import {Location} from '@angular/common'

import {Testsample} from './service/test.sample'
import {Testplan} from './service/testplan'
import {TestplanService} from './service/testplan.service'

import {Testrunner } from './service/testrunner'
import {TestrunnerService} from './service/testrunner.service'

import {Device} from './service/device'
import {OnlineDevice} from './service/online-device'
import {DeviceService} from './service/device.service'

import {Apk} from './service/apk';
import {ApkService} from './service/apk.service'

import {Configuration} from './service/configuration'
@Component({
    moduleId:module.id,
    selector:'testsample',
    templateUrl:'testsample.component.html'
})

export class TestsampleComponent{

    constructor(
        private router:Router,
        private location:Location,
        private activeRouter:ActivatedRoute,
        private dService:DeviceService,
        private tService:TestplanService,
        private testService:TestrunnerService,
        private apkService:ApkService

    ){}

    /*数据结构*/
    imageUrl:string;
    testsampleId:string;
    testsample:Testsample;

    apk:Apk;
    deviceList:OnlineDevice [];
    selectedDevice:OnlineDevice;

    /*运行列表：查看详细其实是查看最近的一次运行*/
    testrunner:Testrunner;
    testrunnerList:Testrunner[];

    /*前置脚本*/
    testplanList:Testplan [];
    testsampleList:Testsample[];
    selectedTestsample:Testsample;

    /*初始化*/
    ngOnInit():void{
        this.activeRouter.params.forEach((params:Params)=>{
            this.testsampleId = params['id']
            this.getTestsample()
            this.getOnlineDevice()
        })
    }

    /*获取前置脚本*/
    getTestplanList():void{
        this.tService.getTestplansScript(this.testsample.project,this.testsample.version)
            .then(res => {this.testplanList = res
                console.log(res)
            })
    }

    selectedTestplan:string = '测试计划';
    selectTestplan(event:string):void{
        this.getTestsampleList(event)
    }
    selectedTTestsample:string = '测试用例'
    selectTestsample(event:string):void{
        this.testsampleList.forEach((element)=>{
            if(element.name === event)
                this.selectedTestsample = element
        })
    }


    /*获取前置脚本*/
    getTestsampleList(testplanName:string):void{
        const testplan = this.testplanList[0];
        if(testplan === null || testplan === undefined)
            return ;
        this.tService.getTestsamplesScript(testplan.project,testplan.version,testplanName)
            .then(res => this.testsampleList = res)
    }

    /*获取testsample详情*/
    getTestsample():void{
        this.tService.getSampleDatail(this.testsampleId)
            .then(response => {this.testsample = response;
                this.imageUrl = `${Configuration.url}/images/${this.testsample.project}.png`
                if(this.tagSelect())
                    this.selectPage('page1')
                else
                    this.selectPage('page2')

                this.getTestrunner()
                this.getApk()
                this.getTestplanList()
            })
    }

    /*获取在线设备列表*/
    getOnlineDevice():void{
        this.dService
            .getOnlineDevices()
            .then(response => this.deviceList = response);
    }

    /*Get targeted apk*/
    getApk():void{
        this.apkService.getApk(this.testsample.project,this.testsample.version)
            .then(response => this.apk = response,err =>{
                alert("获取apk信息出错")
            }).then(()=>console.log(this.apk))
    }

    /*获取运行列表*/
    getTestrunner():void{
        this.testService.getTargetList(this.testsample)
            .then(response => this.testrunnerList = response.reverse())
    }

    deleteTestrunner(element:Testrunner):void{
        const id = (Object)(element)._id;
        console.log('删除Testrunner '+id);
        this.testService.delete(id)
            .then(response =>{
                this.testrunnerList = this.testrunnerList.filter(h => h!==element)
            },err=>{
                alert('删除失败')
            })
    }

    /*查看一次运行的具体结果*/
    gotoDetail(runner:Testrunner){
        const id = (Object)(runner)._id;
        console.log('Testrunner '+id);
        this.router.navigate(['result',id])
    }

    /*选择设备*/
    selectDevice():void{
        var selectdevice = document.getElementById('selectDevice') as HTMLSelectElement;
        const selectedIndex = selectdevice.selectedIndex;
        this.selectedDevice = this.deviceList[selectedIndex];
    }
    selectDevice2():boolean{
        var selectdevice = document.getElementById('selectDevice2') as HTMLSelectElement;
        if(selectdevice === null)
            return false;
        const selectedIndex = selectdevice.selectedIndex;
        console.log("选择设备的下标为"+selectedIndex);
        this.selectedDevice = this.deviceList[selectedIndex];
        return true
    }

    /*更新测试用例*/
    updateTestsample():void{
        this.selectDevice()

        /*update testsample*/
        //console.log(this.testsample.script)
        // console.log(this.selectedTestsample)
        //if(this.selectedTestsample == null) {
        //    this.testsample.script = '';
        //}
        //console.log(this.testsample.script)

        this.tService.updateTestsample(this.testsample)
    }

    /*页面控制*/
    pageSelect:string = 'page1'
    selectPage(page:string):void{
        this.pageSelect = page
    }

    tagSelect():boolean{
        if(this.testsample.tag === "Monkey")
            return true
        else if(this.testsample.tag === "DFS遍历")
            return true
        else if(this.testsample.tag === '录制脚本')
            return false
        else return false
    }
    /*页面控制*/

    /*功能函数*/
    stringToArray():string[]{
        const actionList = this.testsample.script.split('##');
        actionList.pop();
        return actionList;
    }

    /*建立一次运行*/
    generateTestsample():void{

        //this.selectDevice();
        this.updateTestsample();
        if(!this.selectedDevice){
            return alert("创建运行失败：未选择设备")
        }

        /*用testsample初始化testrunner*/
        //console.log(this.testsample)
        this.testrunner = new Testrunner()

        this.testrunner.project = this.testsample.project;
        this.testrunner.version = this.testsample.version;
        this.testrunner.testplan = this.testsample.testplan;
        this.testrunner.testsample = this.testsample.name;
        this.testrunner.tag = this.testsample.tag;
        this.testrunner.deviceId = this.selectedDevice.id;
        this.testrunner.state = 'running';
        this.testrunner.config = this.testsample.config;
        this.testrunner.script = '';
        if(this.selectedTestsample != null) {
            this.testrunner.script = this.selectedTestsample.script;
            console.log(this.testrunner.script)
        }
        this.testrunner.resultMonkey = ['Result of Testcase Runnning'];
        this.testrunner.seed = ''
        this.testrunner.selectedActivity = ''

        //console.log(this.testrunner)

        this.testService
            .create(this.testrunner)
            .then(response => {
                this.testrunnerList.unshift(response)
            })
    }

    /*查看用例详情：其实这就是重放的一个过程*/
    replayTestsample():void{
        let resultString:string = '';
        const resultList = this.testrunnerList[0].actionList
        for(let i = 0 ; i < resultList.length; i++){
            console.log(resultList[i])
            resultString = resultString.concat(resultList[i]);
            resultString = resultString.concat('##');
        }
        console.log(resultString)

        this.testsample.script = resultString;

        this.tService.updateTestsample(this.testsample).then(()=>{
            this.gotoReplayScript()
        })
    }

    /*路由：录制脚本需要关联设备Id*/
    gotoRecordScript():void{
        this.selectDevice2()
        if(!this.selectedDevice){
            alert("创建运行失败：未选择设备")
            return
        }
        console.log(this.selectedDevice)

        if(this.testsample){
            const trans = (Object)(this.testsample);
            const id = trans._id;
            const deviceId = this.selectedDevice.id;   //需要获取设备ID
            this.router.navigate(['editScript',id,deviceId]);
        }
    }

    /*路由：编辑脚本*/
    gotoEditScript():void{
        const trans = (Object)(this.testsample);
        const id = trans._id;
        this.router.navigate(['updateScript',id]);
    }

    /*路由:replay脚本,需要关联设备Id*/
    gotoReplayScript():void{
        if(!this.selectDevice2())
            this.selectDevice()
        if(!this.selectedDevice){
            alert("创建运行失败：未选择设备")
            return
        }
        const trans = (Object)(this.testsample);
        const id = trans._id;
        const deviceId = this.selectedDevice.id;   //需要获取设备ID
        this.router.navigate(['replayScript',id,deviceId]);
    }

    /*日期*/
    transDate(date:Date){
        const s = date.toString();
        return s.slice(0,16);
    }
}
