/**
 * Created by ghj on 16-10-15.
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
var router_1 = require('@angular/router');
var common_1 = require('@angular/common');
var CreateProjectComponent = (function () {
    function CreateProjectComponent(router, location) {
        this.router = router;
        this.location = location;
    }
    CreateProjectComponent.prototype.ngOnInit = function () {
    };
    CreateProjectComponent.prototype.hello = function () {
    };
    CreateProjectComponent.prototype.back = function () {
        this.router.navigate(['/projects']);
    };
    CreateProjectComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'create-project',
            templateUrl: 'create-project.component.html',
        }), 
        __metadata('design:paramtypes', [router_1.Router, common_1.Location])
    ], CreateProjectComponent);
    return CreateProjectComponent;
}());
exports.CreateProjectComponent = CreateProjectComponent;
//# sourceMappingURL=create-project.component.js.map