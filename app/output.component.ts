
import {Component,OnInit} from '@angular/core';

import {Location} from '@angular/common';
import {ActivatedRoute,Params} from '@angular/router';

import {Testrunner} from './service/testrunner';
import {TestrunnerService} from './service/testrunner.service'

@Component({
    moduleId:module.id,
    selector:'output',
    templateUrl:'output.component.html',
})

export class OutputComponent implements OnInit{
    constructor(
        private route:ActivatedRoute,
        private location:Location,
        private service:TestrunnerService
    ){}

    /*数据结构*/
    testid:string;
    testrunner:Testrunner;
    resultMonkey = ['null'];
    imageUrl :string;

    ngOnInit():void{

        this.route.params.forEach((params:Params)=>{
            let id = params['id']
            this.testid = id;
            this.getDetail(id)
        })

    }

    /*页面选择*/
    selectedPage:string = 'page5';
    selectActive(selected:string):void{
        this.selectedPage = selected;
        console.log(this.selectedPage)
    }

    /*获取详细信息*/
    getDetail(id:string){
        this.service.getData(id)
            .then(test => {
                this.testrunner = test
                this.resultMonkey = this.testrunner.resultMonkey;
                this.imageUrl = `http://localhost:8080/images/${this.testrunner.project}.png`
            })
    }

    getActivityCount():number{
        const activity = this.testrunner.activityList
        let result = []
        activity.forEach(element =>{
            if(result.indexOf(element) == -1)
                result.push(element)
        })
        return result.length
    }

    getActionCount():number{
        return this.testrunner.actionList.length
    }

    /*将结果持久化到github：问题*/
    saveGithub(){
        this.service.save(this.testid)
            .then(res =>{
                alert("保存成功")
            },err=>{
                alert("保存失败")
            })
    }

    /*路由*/
    goBack():void{
        this.location.back();
    }
}