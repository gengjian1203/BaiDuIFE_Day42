class Menu {
    constructor() {
        this.list = [];
    }
    
    static getInstance() {
        if (!this.instance) {
            this.instance = new Menu();
        }
        return this.instance;
    }

    pushMenu(meal) {
        this.list.push(meal);
    }
}