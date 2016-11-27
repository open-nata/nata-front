/**
 * Created by ghj on 16-10-14.
 */

import {ModuleWithProviders} from '@angular/core';

import {Routes,RouterModule} from '@angular/router';

import {ProjectsComponent} from './projects.component';
import {DevicesComponent} from './devices.component';
import {ProjectManagerComponent} from './project-manager.component';
import {EditScriptComponent} from './edit-script.component';

import {RunnerListComponent} from './runner-list.component';
import {RunnerComponent} from './runner.component';
import {OutputComponent} from './output.component';
import {ResultComponent} from './result.component';

const appRoutes:Routes = [
    {
        path: '',
        redirectTo: '/projects',
        pathMatch: 'full'
    },
    {
        path:'projects',
        component:ProjectsComponent
    },
    {
        path:'devices',
        component:DevicesComponent
    },
    {
        path:'projectManager/:name',
        component:ProjectManagerComponent
    },
    {
        path:'editScript/:name',
        component:EditScriptComponent
    },
    {
        path:'runner-list',
        component:RunnerListComponent
    },
    {
        path:'runner/:id',
        component:RunnerComponent
    },
    {
        path:'debug',
        component:ResultComponent
    },
    {
        path:'result/:id',
        component:OutputComponent
    }

];

/*
使用RouterModule.forRoot方法，导出包含路由数组的常亮routing。返回一个配置好的路由模块，
加到根ＮgModule - AppModule中
 */
export const routing:ModuleWithProviders = RouterModule.forRoot(appRoutes);
