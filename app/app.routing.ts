/**
 * Created by ghj on 16-10-14.
 */

import {ModuleWithProviders} from '@angular/core';

import {Routes,RouterModule} from '@angular/router';

import {ProjectsComponent} from './projects.component';
import {DevicesComponent} from './devices.component';
import {ProjectManagerComponent} from './project-manager.component';
import {RecordScriptComponent} from './record-script.component';
import {UpdateScriptComponent} from './update-script.component';
import {ReplayScriptComponent} from './replay-script.component';

import {RunnerListComponent} from './runner-list.component';
import {RunnerComponent} from './runner.component';
import {OutputComponent} from './output.component';
import {TestsampleComponent} from './testsample.component';
import {ResultComponent} from './result.component';  //debug用
import {DemoComponent} from './demo.component';

const appRoutes:Routes = [
    {
        path: '',
        redirectTo: '/demo',
        pathMatch: 'full'
    },
    {
        path:'projects',
        component:ProjectsComponent,
        pathMatch:'full'
    },
    {
        path:'devices',
        component:DevicesComponent
    },
    {
        path:'project-manager/:name',
        component:ProjectManagerComponent
    },
    {
        path:'editScript/:id/:deviceId',
        component:RecordScriptComponent
    },
    {
        path:'replayScript/:id/:deviceId',
        component:ReplayScriptComponent
    },
    {
        path:'updateScript/:id',
        component:UpdateScriptComponent
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
    },
    {
        path:'testsample/:id',
        component:TestsampleComponent
    },
    {
        path:'demo',
        component:DemoComponent
    }

];

/*
使用RouterModule.forRoot方法，导出包含路由数组的常亮routing。返回一个配置好的路由模块，
加到根ＮgModule - AppModule中
 */
export const routing:ModuleWithProviders = RouterModule.forRoot(appRoutes);
