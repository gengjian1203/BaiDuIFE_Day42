class Cook extends Worker {
    constructor(name, salary) {
        super(name, salary);
    }

    doCooking() {
        console.log(this.name + "正在烹饪");
    }
}