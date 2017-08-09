/**
 * 测试用例生成器:一次测试运行
 */

class ActPath{
    activity:string;
    actions:[string]
}

export class Testrunner {
    project:string;
    version:string;
    testplan:string;
    testsample:string;
    tag:string;
    deviceId:string;  //运行的设备
    state:string; //此次运行的状态值:running,stop
    config:string;　　//配置：monkey，dfs等算法只需要一个配置命令即可
    script:string;　　//录制脚本:对于脚本的运行，表示脚本的具体内容

    resultMonkey:[string]; //实时的数据流：实时的运行结果

    /*Monkey*/
    seed:string;

    /*DFS 探索到的路径*/
    activityList:[string];
    actionList:[string];
    activityPath:[ActPath];
    selectedActivity:string;
    //crashList:[string];
}