/**
 * Created by ghj on 16-10-16.
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
var ApkManagerComponent = (function () {
    function ApkManagerComponent(route, location) {
        this.route = route;
        this.location = location;
        this.version = '2.3.1';
        this.versions = ['2.3.0', '2.3.1', '2.3.2', '2.3.3', '2.3.4', '2.3.5',
            '2.4.0', '2.4.1', '2.4.2', '2.4.3', '2.4.4', '2.4.5',
            '2.5.0', '2.5.1', '2.5.2', '2.5.3', '2.5.4', '2.5.5'];
        //For page list
        this.startPage = 0;
        this.allPage = this.versions.length / 4;
        this.versionDisplay = this.versions.slice(0, 4);
    }
    ApkManagerComponent.prototype.prePage = function () {
        if (this.startPage > 0) {
            this.startPage--;
        }
    };
    ApkManagerComponent.prototype.nextPage = function () {
        if (this.startPage + 5 > this.allPage)
            return;
        this.startPage++;
    };
    ApkManagerComponent.prototype.getVersions = function (currentPage) {
        //Each page display 4 apks
        var index = (currentPage - 1) * 4;
        this.versionDisplay = this.versions.slice(index, index + 4);
    };
    ApkManagerComponent.prototype.selectVersion = function (v) {
        this.version = v;
    };
    ApkManagerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            _this.name = params['name'];
        });
    };
    ApkManagerComponent.prototype.back = function () {
        this.location.back();
    };
    ApkManagerComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'apk-manager',
            templateUrl: 'apk-manager.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, common_1.Location])
    ], ApkManagerComponent);
    return ApkManagerComponent;
}());
exports.ApkManagerComponent = ApkManagerComponent;
//# sourceMappingURL=apk-manager.component.js.map