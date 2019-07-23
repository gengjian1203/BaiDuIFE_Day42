class Cook extends Worker {
    constructor(name, salary) {
        super(name, salary);
    }

    doWorking() {
        var arrCooking = _queueCooking.shift();
        if (arrCooking == null) {
            console.log("厨师：" + this.name + "，正在休息");
            setTimeout(() => {
                this.doWorking();
            }, 3000);

        } else {
            this.doCooking(arrCooking);
        }
    }

    doCooking(arrCooking) {
        console.log("厨师：" + this.name + "，正在烹饪菜式：" + Menu.getInstance().list[arrCooking[0]].name);
        setTimeout(() => {
            this.doWorking();
        }, 3000);
        Waiter.getInstance().sendCooking();
    }

    static getInstance(name, salary) {
        if (!this.instance) {
            this.instance = new Cook(name, salary);
        }
        return this.instance;
    }
}