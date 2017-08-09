/**
 * Created by ghj on 16-10-10.
 */

import './rxjs-extensions';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';

import {DemoComponent} from './demo.component';
import {AppComponent} from "./app.component";
import {DevicesComponent} from './devices.component';
import {ProjectsComponent} from './projects.component';
import {ProjectManagerComponent} from './project-manager.component';

import {TestsampleComponent} from './testsample.component';
import {RecordScriptComponent} from './record-script.component';
import {ReplayScriptComponent} from './replay-script.component';
import {UpdateScriptComponent} from './update-script.component';
import {RunnerListComponent} from './runner-list.component';
import {RunnerComponent} from './runner.component';
import {OutputComponent} from './output.component';
import {ResultComponent} from './result.component';

import {FileSelectDirective} from 'ng2-file-upload';
import {CodemirrorModule} from 'ng2-codemirror';

//Route for the module
import {routing } from './app.routing';

//Services for the module
import {ApkService } from './service/apk.service';
import {DeviceService} from './service/device.service';
import {ProjectService} from './service/project.service';
import {TestplanService} from './service/testplan.service';
import {TestdemoService} from './service/testdemo.service';
import {TestrunnerService} from './service/testrunner.service';

@NgModule({
    imports : [BrowserModule,
        FormsModule,
        routing,
        HttpModule,
        CodemirrorModule
    ],
    declarations:[AppComponent,
        DevicesComponent,
        ProjectsComponent,
        ProjectManagerComponent,
        RecordScriptComponent,
        UpdateScriptComponent,
        ReplayScriptComponent,
        TestsampleComponent,
        RunnerListComponent,
        RunnerComponent,
        OutputComponent,
        ResultComponent,
        FileSelectDirective,
        DemoComponent,
    ],
    providers:[DeviceService,
        ProjectService,
        TestplanService,
        TestrunnerService,
        ApkService,
        TestdemoService
    ],
    bootstrap:[AppComponent]
})

export class AppModule{}