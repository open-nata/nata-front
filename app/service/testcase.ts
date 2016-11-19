/**
 * Created by ghj on 16-11-19.
 */

/*每个testcast是一个测试用例的一次运行*/
import {Testsample} from './test.sample';

export class Testcast{
    testsample:Testsample;
    testcase:number;  //运行的编号
    device:string;
    isFinish:boolean;
    create_at:Date;
    treeresult:string;  //path
    logresult:string;
    bugresult:string;
    screenshot:string; //path
}




