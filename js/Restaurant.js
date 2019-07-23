class Restaurant {
    constructor(arrData) {
        this.cash = arrData["case"];
        this.seats = arrData["seats"];
        this.staff = arrData["staff"];
    }

    hire(person) {
        this.staff.push(person);
    }

    fire(person) {
        for (var index in this.staff) {
            if (this.staff[index].id == person.id) {
                this.staff.splice(index, 1);
                break;
            }
        }
    }
}