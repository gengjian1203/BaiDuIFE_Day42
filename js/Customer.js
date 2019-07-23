class Customer {
    constructor() {
        this.name = _arrFirst[Math.floor(Math.random() * (_arrFirst.length - 1))] + _arrSecond[Math.floor(Math.random() * (_arrSecond.length - 1))];
    }

    // 挑选菜式（默认3秒钟）
    orderDishes() {
        console.log("顾客：" + this.name + "，正在点菜");
        // var arrMeal = Menu.getInstance().list[Math.floor(Math.random() * (Menu.getInstance().list.length - 1))];
        setTimeout(() => {
            this.decideDishes();
        }, 3000);
    }

    // 决定菜式
    decideDishes(nIndex) {
        this.nIndex = Math.floor(Math.random() * (Menu.getInstance().list.length - 1));
        console.log("顾客：" + this.name + "，考虑过后，选择了菜式：" + Menu.getInstance().list[this.nIndex].name);
        // 服务生传递菜单
        Waiter.getInstance().doWork(this.nIndex);
    }

    eating() {
        console.log("顾客" + this.name + "正在用膳");
        setTimeout(() => {
            this.bill();
        }, 2000);
    }

    bill() {
        var nSurplus = Menu.getInstance().list[this.nIndex].price - Menu.getInstance().list[this.nIndex].cost;
        console.log("顾客" + this.name + "结账完毕，盈利：" + nSurplus);
        Restaurant.getInstance().cash += nSurplus;
        Restaurant.getInstance().arrIn[0] = "空座";
        Restaurant.getInstance().funPopQueue();
    }
}