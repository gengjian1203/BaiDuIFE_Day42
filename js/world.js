// 初始化菜单
function funInitMenu() {
    var objMeal = new Meal({name: "红烧肉", cost: 10, price: 30});
    Menu.getInstance().pushMenu(objMeal);
    var objMeal = new Meal({name: "糖醋排骨", cost: 12, price: 35});
    Menu.getInstance().pushMenu(objMeal);
    var objMeal = new Meal({name: "可乐鸡翅", cost: 8, price: 25});
    Menu.getInstance().pushMenu(objMeal);
    var objMeal = new Meal({name: "鱼香肉丝", cost: 8, price: 20});
    Menu.getInstance().pushMenu(objMeal);
    var objMeal = new Meal({name: "水煮鱼", cost: 30, price: 80});
    Menu.getInstance().pushMenu(objMeal);
    var objMeal = new Meal({name: "口水鸡", cost: 12, price: 32});
    Menu.getInstance().pushMenu(objMeal);
    var objMeal = new Meal({name: "西红柿炒鸡蛋", cost: 4, price: 12});
    Menu.getInstance().pushMenu(objMeal);
    var objMeal = new Meal({name: "酸辣土豆丝", cost: 3, price: 10});
    Menu.getInstance().pushMenu(objMeal);
    var objMeal = new Meal({name: "鱼香茄子", cost: 3, price: 12});
    Menu.getInstance().pushMenu(objMeal);
    var objMeal = new Meal({name: "小鸡炖蘑菇", cost: 5, price: 24});
    Menu.getInstance().pushMenu(objMeal);
}

// 初始化餐馆
function funInitRestaurant() {
    // 开设一家餐馆。启动资金：10000元。座位：1个。职工：空。
    Restaurant.getInstance({cash: 10000, seats: 1, staff: []});
    // 入职一个厨师
    Cook.getInstance("Tony", 10000);
    Restaurant.getInstance().hire(Cook.getInstance());
    Cook.getInstance().doWorking();
    // 入职一个服务生
    Waiter.getInstance("Jack", 3000);
    Restaurant.getInstance().hire(Waiter.getInstance());
}

// 每隔5秒钟来一名客人
function funCustomerComming() {
    var cuer = new Customer();
    // 将客人压入餐馆
    Restaurant.getInstance().funPushQueue(cuer);
    
}

// 每隔1秒钟刷新界面数据
function funUpdateDOM() {
    // 餐厅状态
    var objCash = document.getElementById("cash");
    objCash.innerHTML = Restaurant.getInstance().cash;
    var objSeats = document.getElementById("seats");
    objSeats.innerHTML = Restaurant.getInstance().seats;
    var objStaff = document.getElementById("staff");
    objStaff.innerHTML = "";
    for (var index in Restaurant.getInstance().staff) {
        objStaff.innerHTML += Restaurant.getInstance().staff[index].name;
        objStaff.innerHTML += ", ";
    }
    var objMenu = document.getElementById("menu");
    objMenu.innerHTML = "";
    for (var index in Menu.getInstance().list) {
        objMenu.innerHTML += "[";
        objMenu.innerHTML += Menu.getInstance().list[index].name;
        objMenu.innerHTML += ", ";
        objMenu.innerHTML += Menu.getInstance().list[index].cost;
        objMenu.innerHTML += ", ";
        objMenu.innerHTML += Menu.getInstance().list[index].price;
        objMenu.innerHTML += "] ";
    }

    // 店内用餐情况
    var objArrIn = document.getElementById("arrIn");
    objArrIn.innerHTML = "";
    for (var index = 0; index < Restaurant.getInstance().seats; index++) {
        if ("空座" == Restaurant.getInstance().arrIn[index]) {
            objArrIn.innerHTML += "空座, ";
        } else {
            objArrIn.innerHTML += Restaurant.getInstance().arrIn[index].name;
            objArrIn.innerHTML += ", ";
        }
    }

    // 门外排队状态
    var objQueueOut = document.getElementById("queueOut");
    objQueueOut.innerHTML = "";
    for (var index in Restaurant.getInstance().queueOut) {
        objQueueOut.innerHTML += Restaurant.getInstance().queueOut[index].name;
        objQueueOut.innerHTML += ", ";
    }
}


////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
window.onload = function() {
    // 初始化菜单
    funInitMenu();
    // 初始化餐馆
    funInitRestaurant();
    // 设置定时器
    
    // 来客
    _t1 = setInterval(funCustomerComming, 5000);
    // 刷新
    _t0 = setInterval(funUpdateDOM, 1000);
}