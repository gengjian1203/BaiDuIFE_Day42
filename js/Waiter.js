class Waiter extends Worker {
    constructor(name, salary) {
        super(name, salary);
    }

    doWork(nIndex) {
        // if ( Object.prototype.toString.call(para) == "[object Array]" ) {
        // 记录客人点菜
        console.log("服务员：" + this.name + " 记录客人点菜:" + Menu.getInstance().list[nIndex].name + "，将菜式告知后厨");
        var arrCooking = [nIndex, 1];
        _queueCooking.push(arrCooking);
    }

    sendCooking() {
        Restaurant.getInstance().arrIn[0].eating();
    }

    static getInstance(name, salary) {
        if (!this.instance) {
            this.instance = new Waiter(name, salary);
        }
        return this.instance;
    }

}