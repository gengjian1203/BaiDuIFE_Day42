class Cook extends Worker {
    constructor(name, salary) {
        super(name, salary);
        this.type = "cook";
        this.strState = "正在休息";
        this.nState = 0;
        this.time = 0;
    }

    // 主循环
    doWorking(arrCooking) {
        switch(this.nState) {
            case 0:
                // 休息
                this.doResting();
                break;
            case 1:
                // 做菜
                this.doCooking(arrCooking);
                break;
            default:
                // 
                console.error("Cook错误的状态号。");
                break;
        }
    }

    // 厨师休息，并搜索可做的工作
    doResting() {
        var arrCooking = _queueCooking.shift();
        if (arrCooking == null) {
            this.nState = 0;
            this.strState = "正在休息";
            this.time = 0;
        }  else {
            this.nState = 1;
        }
        // 循环
        setTimeout(() => {
            this.doWorking(arrCooking);
        }, _nBaseTime);
    }

    // 厨师做菜
    doCooking(arrCooking) {
        // console.log("厨师：" + this.name + "，正在烹饪菜式：" + Menu.getInstance().list[arrCooking[0]].name + "，需要用时：" + Menu.getInstance().list[arrCooking[0]].time + "个时间单位。");
        this.strState = Menu.getInstance().list[arrCooking[0]].name;
        this.time = Menu.getInstance().list[arrCooking[0]].time;

        setTimeout(() => {
            // 待修改
            // Waiter.getInstance().sendCooking(arrCooking);
            _queueFinishing.push(arrCooking);
            this.nState = 0;
            this.doWorking();
        }, Menu.getInstance().list[arrCooking[0]].time * _nBaseTime);
    }
}