/**
 * Created by ghj on 16-11-18.
 */

/*Testplan类的定义:测试计划关联一个项目的一个具体apk版本*/

export class Testplan{
    project:string;
    version:string;
    name:string;
    describe:string;
    manager:string;
    tag:string;    //固定算法：选择
}