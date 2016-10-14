/**
 * Created by ghj on 16-10-14.
 */

import {ModuleWithProviders} from '@angular/core';

import {Routes,RouterModule} from '@angular/router';

import {ProjectsComponent} from './projects.component';
import {DevicesComponent} from './devices.component';

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
    }
];

/*
使用RouterModule.forRoot方法，导出包含路由数组的常亮routing。返回一个配置好的路由模块，
加到根ＮgModule - AppModule中
 */
export const routing:ModuleWithProviders = RouterModule.forRoot(appRoutes);
