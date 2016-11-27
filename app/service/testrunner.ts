/**
 * Created by ghj on 16-11-23.
 */

export class Testrunner {
    //_id:默认生成的属性
    _id:string;
    project:string;
    version:string;
    testplan:string;
    testsample:string;
    tag:string;
    deviceId:string;
    state:string; //此次运行的状态值:running,stop
    config:string;　　//配置：monkey，dfs等算法只需要一个配置命令即可
    script:string;　　//脚本:对于脚本的运行，表示脚本的具体内容
    resultMonkey:[string]; //暂时用于monkey的运行结果
    create_at:Date;
}