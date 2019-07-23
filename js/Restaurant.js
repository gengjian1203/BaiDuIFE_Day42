class Restaurant {
    constructor(arrData) {
        this.cash = arrData["cash"];
        this.seats = arrData["seats"];
        this.staff = arrData["staff"];
        this.queueOut = [];
        this.arrIn = [];
        for (var i = 0; i < this.seats; i++) {
            this.arrIn.push("空座");
        }
    }
    // 单例模式
    static getInstance(arrData) {
        if (!this.instance) {
            this.instance = new Restaurant(arrData);
        }
        return this.instance;
    }

    // 雇佣
    hire(person) {
        this.staff.push(person);
    }
    // 解雇
    fire(person) {
        for (var index in this.staff) {
            if (this.staff[index].id == person.id) {
                this.staff.splice(index, 1);
                break;
            }
        }
    }

    // 新来顾客
    funPushQueue(person) {
        var index = this.arrIn.indexOf("空座");
        if (index != -1) {
            // 如果店铺有空位，则直接入座
            this.arrIn[index] = person;
            person.orderDishes();
        } else {
            // 店外排队
            this.queueOut.push(person);
        }
    }

    // 客人入座就餐
    funPopQueue() {
        var index = this.arrIn.indexOf("空座");
        if (index != -1) {
            // 如果店铺有空位，则队伍第一个人入座用餐
            var person = this.queueOut.shift()
            this.arrIn[index] = person;
            person.orderDishes();
        }
    }


}