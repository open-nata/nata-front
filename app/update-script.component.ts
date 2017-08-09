/**
 * 编辑一个测试案例的脚本:脚本测试关联特定的设备？
 * 录制时关联一个特定的设备：每次录制认为还是作为Testsample
 */
import {Component,OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute,Params} from '@angular/router';

import {Testsample} from './service/test.sample';
import {TestplanService} from './service/testplan.service';


@Component({
    moduleId:module.id,
    selector:'update-script',
    templateUrl:'update-script.component.html'
})

export class UpdateScriptComponent{
    constructor(
        private route: ActivatedRoute,
        private location:Location,
        private serviceT:TestplanService
    ){}

    /*数据结构*/
    testSample:Testsample;
    testSampleId:string;    //两个id信息从路由获得

    // 动作列表
    actionList = [];
    actionString:string = '';

    /*初始化函数*/
    ngOnInit():void{
        this.route.params.forEach((params:Params)=>{
            let id = params['id']
            this.testSampleId = id;
            this.getDetail(id)
        })
    }

    /*获取详细信息*/
    getDetail(id:string):void{
        /*在每个手机连接时，运行minicap的脚本，在获取详细信息时 adb forward 1717*/
        this.serviceT.getSampleDatail(this.testSampleId)
            .then(res => this.testSample = res,
                err => alert(err))
            .then(()=> {
                console.log(this.testSample)
                this.stringToArray();
            })
    }

    /*获取动作*/
    stringToArray():void{
        let str = this.testSample.script;
        this.actionList = str.split('##');

        this.actionList.forEach(action =>{
            this.actionString += action;
            this.actionString += '\n'
        })
        console.log(this.actionString)
    }

    /*保存修改*/
    save():void{
        console.log(this.actionString)
        let resultString = '';
        let resultList = this.actionString.split('\n');
        resultList.forEach(action =>{
            if(action.length >= 1) {
                resultString += action.trim()
                resultString += '##';
            }
        })
        console.log(resultString)

        this.testSample.script = resultString;
        this.serviceT.updateTestsample(this.testSample)
            .then(res =>{
                alert("保存成功")
            },err=>{
                alert("保存更新失败")
            })
    }

    /*返回路由*/
    back():void{
        this.location.back();
    }
}