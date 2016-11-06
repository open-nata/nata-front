/**
 * Created by ghj on 16-10-24.
 */
import { Component,OnInit} from '@angular/core';

import {barChart} from './baiduMap'

//
import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Component({
    moduleId:module.id,
    selector: 'result',
    templateUrl:'result.component.html'
})

@Injectable()
export class ResultComponent implements OnInit{
    constructor(private http:Http){}

    ngOnInit():void {
        //barChart();
        this.test();
    }

    test(): Promise<void> {
        const url = 'http://localhost:8080/book';
        return this.http.get(url)
            .toPromise()
            .then(response => alert(response.text()))
            .catch();
    }

}