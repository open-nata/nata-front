/**
 * Created by ghj on 16-10-14.
 */
"use strict";
var router_1 = require('@angular/router');
var projects_component_1 = require('./projects.component');
var devices_component_1 = require('./devices.component');
var create_project_component_1 = require('./create-project.component');
var apk_manager_component_1 = require('./apk-manager.component');
var edit_script_component_1 = require('./edit-script.component');
var runner_component_1 = require('./runner.component');
var appRoutes = [
    {
        path: '',
        redirectTo: '/projects',
        pathMatch: 'full'
    },
    {
        path: 'projects',
        component: projects_component_1.ProjectsComponent
    },
    {
        path: 'devices',
        component: devices_component_1.DevicesComponent
    },
    {
        path: 'createProject',
        component: create_project_component_1.CreateProjectComponent
    },
    {
        path: 'apkManager/:name',
        component: apk_manager_component_1.ApkManagerComponent
    },
    {
        path: 'editScript/:name',
        component: edit_script_component_1.EditScriptComponent
    },
    {
        path: 'runner/:name',
        component: runner_component_1.RunnerComponent
    }
];
/*
使用RouterModule.forRoot方法，导出包含路由数组的常亮routing。返回一个配置好的路由模块，
加到根ＮgModule - AppModule中
 */
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map