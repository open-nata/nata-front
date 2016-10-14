/**
 * Created by ghj on 16-10-14.
 */
"use strict";
var router_1 = require('@angular/router');
var projects_component_1 = require('projects.component');
var devices_component_1 = require('devices.component');
var appRoutes = [
    {
        path: '',
        redirectTo: '/project',
        pathMatch: 'full'
    },
    {
        path: 'projects',
        component: projects_component_1.ProjectsComponent
    },
    {
        path: 'devices',
        component: devices_component_1.DevicesComponent
    }
];
/*
使用RouterModule.forRoot方法，导出包含路由数组的常亮routing。返回一个配置好的路由模块，
加到根ＮgModule - AppModule中
 */
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map