/**
 * Created by ghj on 16-10-10.
 */

import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from "./app.component";
import {DevicesComponent} from './devices.component';
import {ProjectsComponent} from './projects.component';

//Route
import {routing } from './app.routing';

@NgModule({
    imports : [BrowserModule,
        routing
    ],
    declarations:[AppComponent,
        DevicesComponent,
        ProjectsComponent
    ],
    provides:[

    ],
    bootstrap:[AppComponent]
})

export class AppModule{}