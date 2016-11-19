/**
 * Created by ghj on 16-10-14.
 */

import {Component,OnInit} from '@angular/core';

import {Router} from '@angular/router';

import {Project} from './service/project';
import {ProjectService} from './service/project.service';

//封面上传
import {FileUploader} from 'ng2-file-upload';

@Component({
    moduleId:module.id,
    selector:'projects',
    templateUrl:'projects.component.html',
    styleUrls:['projects.component.css']
})

export class ProjectsComponent implements OnInit{
    //封面上传
    private URL = 'http://localhost:8080/images';
    public uploader:FileUploader = new FileUploader({url: this.URL});

    constructor(
        private router: Router,
        private projectService: ProjectService
    ){}

    //项目列表
    projectList:Project[];

    //待创建的项目
    create_project:Project = {
        name:'name',
        describe:'describe',
        manager:'manager',
        imageUrl:'imageUrl'
    };

    ngOnInit():void{
        this.getProjects();
    }

    /*获取项目列表*/
    getProjects():void{
        this.projectService
            .getProjects()
            .then(projectList => {
                this.projectList = projectList
            })
    }

    /*创建项目*/
    createProject():void{
        this.create_project.imageUrl = `http://localhost:8080/images/${this.create_project.name}.png`;
        console.log(this.create_project);
        /*check for create_project*/

        /**/
        this.projectService
            .createProject(this.create_project)
            .then(project => this.projectList.push(project))
    }

    /*上传项目的封面*/
    upload():void{
        console.log('Upload Start');

        this.uploader.onBeforeUploadItem = (item) =>{
            item.withCredentials = false;
            console.log(item.file.name)
            item.file.name = this.create_project.name+'.png';
            console.log(item.file.name)
        }
        this.uploader.uploadAll();
        console.log('Upload end');
    }

    gotoProjectDetail(element:Project):void{
        this.router.navigate(['/projectManager',element.name]);
    }
}