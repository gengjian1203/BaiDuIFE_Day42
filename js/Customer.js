//////////////////////////////////////////////////
// 逻辑状态编号
// 0: 等位
// 1: 等待点菜
// 2: 正在点菜
// 3: 决定菜式
// 4: 等待吃饭
//////////////////////////////////////////////////

class Customer {
    constructor() {
        this.name = _arrFirst[Math.floor(Math.random() * (_arrFirst.length - 1))] + _arrSecond[Math.floor(Math.random() * (_arrSecond.length - 1))];
        // 相貌(共12种相貌)
        this.nFace = Math.floor(Math.random() * 12);

        // 座位
        this.nSeat = 0;
        // 盈利
        this.nSurplus = 0;
        // 文字状态
        this.strState = "等位中……";
        // 逻辑状态
        this.nState = 0;
        // 接待的服务生编号
        this.nWaiter = 0;
    }

    // 等候点餐
    waitDishes() {
        this.nState = 1;
        this.strState = "等待点餐";
    }

    // 挑选菜式（3个时间单位）
    orderDishes() {
        // console.log("顾客：" + this.name + "，正在点菜");
        this.nState = 2;
        this.strState = "正在点菜";
        setTimeout(() => {
            this.decideDishes();
        }, 3 * _nBaseTime);
    }

    // 决定菜式
    decideDishes() {
        this.nState = 3;
        // var strLog = "";
        this.arrDish = [];
        // 随机点1-5个菜
        this.nCount = 1 + Math.floor(Math.random() * 4);
        // 
        // strLog = "顾客：" + this.name + "，考虑过后，选择了菜式：";
        for (var i = 0; i < this.nCount; i++) {
            this.arrDish[i] = Math.floor(Math.random() * (Menu.getInstance().list.length - 1));
            // strLog += Menu.getInstance().list[this.arrDish[i]].name + ", ";
            // 计算盈利
            this.nSurplus += Menu.getInstance().list[this.arrDish[i]].price - Menu.getInstance().list[this.arrDish[i]].cost;
        }
        // console.log(strLog);
        // 等待开饭
        setTimeout(() => {
            this.eating();
        }, _nBaseTime);
        // 服务生传递菜单
        // console.log(this.nWaiter);
        Restaurant.getInstance().staffWaiter[this.nWaiter].doWalk(this.arrDish, this.nSeat);
    }

    eating() {
        this.nState = 4;
        var nCook = _queueSeatCook[this.nSeat].shift();
        if (nCook == null) {
            // console.log("顾客" + this.name + "正在等待用餐。");
            this.strState = "等待用餐";
            setTimeout(() => {
                this.eating();
            }, _nBaseTime);
        } else {
            // console.log(nCook);
            // console.log("顾客" + this.name + "正在品尝菜式：" + Menu.getInstance().list[nCook].name);
            this.strState = "品尝" + Menu.getInstance().list[nCook].name;
            this.arrDish.splice(this.arrDish.indexOf(nCook), 1);
            if (this.arrDish.length == 0) {
                // 吃完等待结账
                setTimeout(() => {
                    this.billWaiter();
                }, 3 * _nBaseTime);
            } else {
                // 继续等下一道菜
                setTimeout(() => {
                    this.eating();
                }, 3 * _nBaseTime);
            }
        }
    }

    billWaiter() {
        this.nState = 5;
        this.strState = "等待结账";
    }

    bill() {
        // console.log("顾客" + this.name + "结账完毕，盈利：" + this.nSurplus);
        this.strState = "正在结账";
        Restaurant.getInstance().cash += this.nSurplus;
        Restaurant.getInstance().arrIn[this.nSeat] = "空座";
        Restaurant.getInstance().funPopQueue();
    }
}