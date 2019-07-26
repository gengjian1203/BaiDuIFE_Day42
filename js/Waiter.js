class Waiter extends Worker {
    constructor(name, salary, id) {
        super(name, salary);
        this.nID = id;
        this.type = "waiter";
        this.strState = "正在休息";
        this.nState = -1;
    }

    doWorking() {
        // 搜索需要点菜的顾客
        for (var i in Restaurant.getInstance().arrIn) {
            if (1 == Restaurant.getInstance().arrIn[i].nState) {
                // console.log("前往" + i + "桌，正在点单");
                this.nState = i;
                this.strState = "正在点单";
                Restaurant.getInstance().arrIn[i].nWaiter = this.nID;
                Restaurant.getInstance().arrIn[i].orderDishes();
                return;
            }
        }

        // 搜索需要买单的顾客
        for (var i in Restaurant.getInstance().arrIn) {
            if (5 == Restaurant.getInstance().arrIn[i].nState) {
                // console.log("前往" + i + "桌，正在买单");
                Restaurant.getInstance().arrIn[i].nWaiter = this.nID;
                this.nState = i;
                this.strState = "正在买单";
                setTimeout(() => {
                    // console.log("休息一下，下一轮循环.");
                    this.doWorking();
                }, 1);
                Restaurant.getInstance().arrIn[i].bill();
                return;
            }
        }

        // 搜索需要上菜的菜品
        var arrFinishing = _queueFinishing.shift();
        if (arrFinishing != null) {
            // console.log("准备上菜");
            this.nState = 10;
            this.doWalkFinish(arrFinishing);
            return;
        } 


        // 循环
        setTimeout(() => {
            // console.log("休息一下，下一轮循环.");
            this.nState = -1;
            this.doWorking();
        }, _nBaseTime);
    }

    doWalkFinish(arrFinishing) {
        this.strState = "正在上菜";
        this.nState = arrFinishing[1];
        // console.log("取到菜，前往顾客。");
        setTimeout(() => {
            this.doFinish(arrFinishing);
        }, 0.5 * _nBaseTime);
    }

    doFinish(arrFinishing) {
        // console.log("菜交给顾客。" + arrFinishing[1] + "号桌的，" + Menu.getInstance().list[arrFinishing[0]].name);
        _queueSeatCook[arrFinishing[1]].push(arrFinishing[0]);

        this.nState = -1;
        this.strState = "正在休息";
        this.doWorking();
    }

    // 走到订单台
    doWalk(arrDish, nSeat) {
        // 服务员往订单台走
        this.strState = "前往订单台";
        // console.log("前往订单台。");
        setTimeout(() => {
            this.doWork(arrDish, nSeat); 
        }, 0.5 * _nBaseTime);
    }

    // 在订单台下订单
    doWork(arrDish, nSeat) {
        // console.log("将菜品下单。");
        this.nState = 10;
        // arrDish
        for (var index in arrDish) {
            // 菜式、座位号    
            var arrCooking = [arrDish[index], nSeat];
            _queueCooking.push(arrCooking);
        }

        this.nState = -1;
        this.strState = "正在休息";
        this.doWorking();
    }

    // sendCooking(arrCooking) {
    //     // 0.5个时间单位后，将完菜送至顾客
    //     setTimeout(() => {
    //         console.log("将完菜送至顾客。");
    //         // console.log(arrCooking[1]);
    //         _queueSeatCook[arrCooking[1]].push(arrCooking[0]);
    //     }, 0.5 * _nBaseTime);
    // }

}