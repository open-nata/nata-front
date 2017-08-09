/**
 * Created by ghj on 16-10-10.
 */
import {Component} from '@angular/core';

@Component({
    moduleId:module.id,
    selector:'my-app',
    templateUrl:'app.component.html'
})

export class AppComponent{
    title = 'NATA';

    changeDisplay():void{
        if(document.getElementById("changeDisplay").className === "glyphicon glyphicon-th-list")
            document.getElementById("changeDisplay").className = "glyphicon glyphicon-th-large";
        else
            document.getElementById("changeDisplay").className = "glyphicon glyphicon-list";
    }
}