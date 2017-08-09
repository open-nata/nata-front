/**
 * Created by ghj on 16-10-24.
 */
import { Component,OnInit} from '@angular/core';

@Component({
    moduleId:module.id,
    selector: 'result',
    templateUrl:'result.component.html'
})


export class ResultComponent implements OnInit{
    constructor(){}

    pageSelect:number = 2;

    ngOnInit():void {
        //barChart();
    }

    pagePre():void{
        if(this.pageSelect > 1) this.pageSelect--;
    }

    pageSucc():void{
        if(this.pageSelect < 8) this.pageSelect++;
    }

}