/**
 * Created by ghj on 16-10-10.
 */
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var app_component_1 = require("./app.component");
var devices_component_1 = require('./devices.component');
var projects_component_1 = require('./projects.component');
var create_project_component_1 = require('./create-project.component');
var apk_manager_component_1 = require('./apk-manager.component');
var edit_script_component_1 = require('./edit-script.component');
var runner_component_1 = require('./runner.component');
//Route for the module
var app_routing_1 = require('./app.routing');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule,
                app_routing_1.routing
            ],
            declarations: [app_component_1.AppComponent,
                devices_component_1.DevicesComponent,
                projects_component_1.ProjectsComponent,
                create_project_component_1.CreateProjectComponent,
                apk_manager_component_1.ApkManagerComponent,
                edit_script_component_1.EditScriptComponent,
                runner_component_1.RunnerComponent
            ],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map