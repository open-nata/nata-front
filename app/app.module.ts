/**
 * Created by ghj on 16-10-10.
 */

import './rxjs-extensions';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';

import {AppComponent} from "./app.component";
import {DevicesComponent} from './devices.component';
import {ProjectsComponent} from './projects.component';
import {ProjectManagerComponent} from './project-manager.component';

import {EditScriptComponent} from './edit-script.component';
import {RunnerListComponent} from './runner-list.component';
import {RunnerComponent} from './runner.component';
import {OutputComponent} from './output.component';
import {ResultComponent} from './result.component';

import {FileSelectDirective} from 'ng2-file-upload';

//Route for the module
import {routing } from './app.routing';

//Services for the module
import {DeviceService} from './service/device.service';
import {ProjectService} from './service/project.service';
import {TestplanService} from './service/testplan.service';
import {TestrunnerService} from './service/testrunner.service';

@NgModule({
    imports : [BrowserModule,
        FormsModule,
        routing,
        HttpModule
    ],
    declarations:[AppComponent,
        DevicesComponent,
        ProjectsComponent,
        ProjectManagerComponent,
        EditScriptComponent,
        RunnerListComponent,
        RunnerComponent,
        OutputComponent,
        ResultComponent,
        FileSelectDirective
    ],
    providers:[DeviceService,
        ProjectService,
        TestplanService,
        TestrunnerService
    ],
    bootstrap:[AppComponent]
})

export class AppModule{}