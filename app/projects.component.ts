/**
 * Created by ghj on 16-10-14.
 */

import {Component,OnInit} from '@angular/core';

import {Router} from '@angular/router';

import {Project} from './service/project';

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
    private URL = 'http://localhost:8080/upload/hello3';
    public uploader:FileUploader = new FileUploader({url: this.URL});
    //public hasBaseDropZoneOver:boolean = false;
    //public hasAnotherDropZoneOver:boolean = false;

    constructor(
        private router :Router
    ){}

    p = [1,2,3,4,5,6,7,8,9,10];

    //待创建的项目
    createProject:Project={
        name:'project',
        describe:'first',
        manager:'ghj',
        imageUrl:'ghj'
    };


    ngOnInit():void{
        
    }

    upload():void{
        console.log('Upload Start');
        this.uploader.onBeforeUploadItem = (item) =>{
            item.withCredentials = false;
        }
        this.uploader.uploadAll();
        console.log('Upload end');
    }
    gotoProjectDetail(ele:string):void{
        this.router.navigate(['/projectManager',ele]);
    }
}