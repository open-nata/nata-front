import {Component,OnInit} from '@angular/core';

import {Router} from '@angular/router';

import {Project} from './service/project';
import {ProjectService} from './service/project.service';

/*封面上传组件*/
import {FileUploader} from 'ng2-file-upload';

import {Configuration} from './service/configuration'

@Component({
    moduleId:module.id,
    selector:'projects',
    templateUrl:'projects.component.html',
})

export class ProjectsComponent implements OnInit{
    //封面上传
    private flag = false;

    private URL = Configuration.url+'/images';
    //private URL = 'http://localhost:8080/images';
    public uploader:FileUploader = new FileUploader({url: this.URL});

    constructor(
        private router: Router,
        private projectService: ProjectService
    ){}

    //项目列表
    projectList:Project[];

    //待创建的项目
    create_project:Project = {
        name:'project_name',
        describe:'describe_something',
        manager:'project_manager',
        imageUrl:'imageUrl'
    };


    /*初始化:获取项目列表*/
    ngOnInit():void{
        this.getProjects();
    }

    getProjects():void{
        this.projectService
            .getProjects()
            .then(projectList => {
                this.projectList = projectList
            })
    }

    /*创建项目*/
    createProject():void{
        if(!this.flag)
            return alert("请先上传封面")

        this.create_project.imageUrl = `${Configuration.url}/images/${this.create_project.name}.png`;

        this.projectService
            .createProject(this.create_project)
            .then(project => this.projectList.push(project),
                err=>alert("请检查创建的项目"))
    }

    /*上传项目的封面*/
    upload():void{

        this.uploader.onBeforeUploadItem = (item) =>{
            item.withCredentials = false;
            item.file.name = this.create_project.name+'.png';
            console.log('封面名称'+item.file.name)
        }
        this.uploader.uploadAll()
        this.flag = true
    }

    /*查看一个具体的项目详细内容*/
    gotoProjectDetail(element:Project):void{
        this.router.navigate(['/project-manager',element.name]);
    }
}