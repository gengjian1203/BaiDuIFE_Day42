class Restaurant {
    constructor(arrData) {
        this.cash = arrData["cash"];
        this.seats = arrData["seats"];
        this.staffCook = arrData["staffCook"];
        this.staffWaiter = arrData["staffWaiter"];
        this.nOut = arrData["nOut"];

        // 店外队列
        this.queueOut = [];
        // 屋内情况
        this.arrIn = [];
        // 座位
        for (var i = 0; i < this.seats; i++) {
            this.arrIn.push("空座");
        }
        // 座位完菜队列
        for (var i = 0; i < this.seats; i++) {
            _queueSeatCook.push([]);
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
    hireCook(person) {
        this.staffCook.push(person);
    }

    hireWaiter(person) {
        this.staffWaiter.push(person);
    }

    // 解雇
    fireCook(person) {
        for (var index in this.staffCook) {
            if (this.staffCook[index].id == person.id) {
                this.staffCook.splice(index, 1);
                break;
            }
        }
    }

    // 解雇
    fireWaiter(person) {
        for (var index in this.staffWaiter) {
            if (this.staffWaiter[index].id == person.id) {
                this.staffWaiter.splice(index, 1);
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
            person.nSeat = index;
            person.waitDishes();
        } else {
            // 店外排队
            if (this.queueOut.length < this.nOut) {
                this.queueOut.push(person);
            } else {
                // delete person;
            }
        }
    }

    // 客人入座就餐
    funPopQueue() {
        var index = this.arrIn.indexOf("空座");
        if (index != -1) {
            // 如果店铺有空位，则队伍第一个人入座用餐
            var person = this.queueOut.shift()
            if (person != null) {
                this.arrIn[index] = person;
                person.nSeat = index;
                person.waitDishes();
            }
        }
    }


}