class Waiter extends Worker {
    constructor(name, salary) {
        super(name, salary);
    }

    doWork(para) {
        if ( Object.prototype.toString.call(para) == "[object Array]" ) {
            // 是数组、记录客人点菜
            console.log(this.name + "记录客人点菜");
        } else {
            // 不是数组、上菜行为
            console.log(this.name + "上菜行为");
        }
    }

}