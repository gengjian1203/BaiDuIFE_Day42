// 初始化菜单
function funInitMenu() {
    var objMeal = new Meal({name: "红烧肉", cost: 10, price: 30, time: 6});
    Menu.getInstance().pushMenu(objMeal);
    var objMeal = new Meal({name: "糖醋排骨", cost: 12, price: 35, time: 4});
    Menu.getInstance().pushMenu(objMeal);
    var objMeal = new Meal({name: "可乐鸡翅", cost: 8, price: 25, time: 2});
    Menu.getInstance().pushMenu(objMeal);
    var objMeal = new Meal({name: "鱼香肉丝", cost: 8, price: 20, time: 2});
    Menu.getInstance().pushMenu(objMeal);
    var objMeal = new Meal({name: "水煮鱼", cost: 30, price: 80, time: 4});
    Menu.getInstance().pushMenu(objMeal);
    var objMeal = new Meal({name: "口水鸡", cost: 12, price: 32, time: 1});
    Menu.getInstance().pushMenu(objMeal);
    var objMeal = new Meal({name: "鸡蛋西红柿", cost: 4, price: 12, time: 2});
    Menu.getInstance().pushMenu(objMeal);
    var objMeal = new Meal({name: "酸辣土豆丝", cost: 3, price: 10, time: 1});
    Menu.getInstance().pushMenu(objMeal);
    var objMeal = new Meal({name: "鱼香茄子", cost: 3, price: 12, time: 2});
    Menu.getInstance().pushMenu(objMeal);
    var objMeal = new Meal({name: "小鸡炖蘑菇", cost: 5, price: 24, time: 3});
    Menu.getInstance().pushMenu(objMeal);
}

// 初始化餐馆
function funInitRestaurant() {
    // 开设一家餐馆。启动资金：10000元。座位：1个。职工：空。
    Restaurant.getInstance({cash: 10000, seats: 6, staffCook: [], staffWaiter: [], nOut: 10});
    // 入职一个厨师
    var cook1 = new Cook("Tony", 10000);
    Restaurant.getInstance().hireCook(cook1);
    cook1.doWorking();
    var cook2 = new Cook("Tony2", 10000);
    Restaurant.getInstance().hireCook(cook2);
    cook2.doWorking();
    var cook3 = new Cook("Tony3", 10000);
    Restaurant.getInstance().hireCook(cook3);
    cook3.doWorking();
    // var cook4 = new Cook("Tony", 10000);
    // Restaurant.getInstance().hireCook(cook4);
    // cook4.doWorking();

    // 入职一个服务生
    var waiter1 = new Waiter("Jack1", 3000, 0);
    Restaurant.getInstance().hireWaiter(waiter1);
    waiter1.doWorking();
    var waiter2 = new Waiter("Jack2", 3000, 1);
    Restaurant.getInstance().hireWaiter(waiter2);
    waiter2.doWorking();
    var waiter3 = new Waiter("Jack3", 3000, 2);
    Restaurant.getInstance().hireWaiter(waiter3);
    waiter3.doWorking();
    var waiter4 = new Waiter("Jack4", 3000, 3);
    Restaurant.getInstance().hireWaiter(waiter4);
    waiter4.doWorking();
}

// 初始化界面
function funInitUI() {
    //////////////////////////////////////////////////
    // 绘制餐厅状态
    //////////////////////////////////////////////////
    var objCash = document.getElementById("cash");
    objCash.innerHTML = Restaurant.getInstance().cash;
    var objSeats = document.getElementById("seats");
    objSeats.innerHTML = Restaurant.getInstance().seats;
    var objOut = document.getElementById("nOut");
    objOut.innerHTML = Restaurant.getInstance().nOut;
    var objCook = document.getElementById("staff_cook");
    objCook.innerHTML = "厨师：";
    for(var index in Restaurant.getInstance().staffCook) {
        objCook.innerHTML += "[" + Restaurant.getInstance().staffCook[index].name + "](" + Restaurant.getInstance().staffCook[index].salary + ") ";
    }
    var objWaiter = document.getElementById("staff_waiter");
    objWaiter.innerHTML = "服务生：";
    for(var index in Restaurant.getInstance().staffWaiter) {
        objWaiter.innerHTML += "[" + Restaurant.getInstance().staffWaiter[index].name + "](" + Restaurant.getInstance().staffWaiter[index].salary + ") ";
    }

    //////////////////////////////////////////////////
    // 绘制菜单
    //////////////////////////////////////////////////
    var arrTitle = ["序号", "菜名", "成本", "售价", "烹饪时间"];
    var objMenu = document.getElementById("menu");
    var objTable = document.createElement("table");
    objTable.style = "width: 100%; height: 85%;";
    var objcaption = document.createElement("caption")
    objcaption.innerHTML = "餐馆菜单";
    objTable.appendChild(objcaption);
    // 绘制第一行
    var objTr = document.createElement("tr");
    for (var index in arrTitle) {
        var objTd = document.createElement("td");
        objTd.innerHTML = arrTitle[index];
        objTr.appendChild(objTd);
    }
    objTable.appendChild(objTr);
    // 绘制数据
    for (var index in Menu.getInstance().list) {
        var objTr = document.createElement("tr");
        var objTd = document.createElement("td");
        objTd.innerHTML = index;
        objTr.appendChild(objTd);
        var objTd = document.createElement("td");
        objTd.innerHTML = Menu.getInstance().list[index].name;
        objTr.appendChild(objTd);
        var objTd = document.createElement("td");
        objTd.innerHTML = Menu.getInstance().list[index].cost;
        objTr.appendChild(objTd);
        var objTd = document.createElement("td");
        objTd.innerHTML = Menu.getInstance().list[index].price;
        objTr.appendChild(objTd);
        var objTd = document.createElement("td");
        objTd.innerHTML = Menu.getInstance().list[index].time;
        objTr.appendChild(objTd);
        objTable.appendChild(objTr);
    }
    objMenu.appendChild(objTable);

    //////////////////////////////////////////////////
    // 绘制厨房
    //////////////////////////////////////////////////
    var objKitchen = document.getElementById("kitchen");
 
    // 绘制列表区域
    var objAllList = document.createElement("div");
    objAllList.style = "float:left; width: 120px; margin: 0px 10; ";
   // 绘制 订单桌
    var objDiv = document.createElement("div");
    objDiv.id = "queueTableCap";
    objDiv.style = "width: 100px; margin: 10px 10px; background-color: #eeeeee;";
    var objP = document.createElement("p");
    objP.id = "queueTableTitle";
    objP.innerText = "【待做的菜】(" + _queueCooking.length + ")";
    objDiv.appendChild(objP);
    var objUl = document.createElement("ol");
    objUl.style.display = "none";
    objUl.id = "queueTable";
    for (var i in _queueCooking) {
        var objLi = document.createElement("li");
        objLi.innerHTML = "[" + _queueCooking[i][1] + "桌]" + Menu.getInstance().list[_queueCooking[i][0]].name;
        objUl.appendChild(objLi); 
    }
    objDiv.appendChild(objUl);
    objAllList.appendChild(objDiv);
    // 绘制 完菜桌
    var objDiv = document.createElement("div");
    objDiv.id = "queueFinishCap";
    objDiv.style = "width: 100px; margin: 10px 10px; background-color: #eeeeee;";
    var objP = document.createElement("p");
    objP.id = "queueFinishTitle";
    objP.innerText = "【做完的菜】(" + _queueFinishing.length + ")";
    objDiv.appendChild(objP);
    var objUl = document.createElement("ol");
    objUl.style.display = "none";
    objUl.id = "queueFinish";
    for (var i in _queueFinishing) {
        var objLi = document.createElement("li");
        objLi.innerHTML = "[" + _queueFinishing[i][1] + "桌]" + Menu.getInstance().list[_queueFinishing[i][0]].name;
        objUl.appendChild(objLi); 
    }
    objDiv.appendChild(objUl);
    objAllList.append(objDiv);

    objKitchen.appendChild(objAllList);

    // 绘制 厨师
    var objCooks = document.createElement("div");
    objCooks.id = "Cooks";
    for (var index in Restaurant.getInstance().staffCook) {
        var objDiv = document.createElement("div");
        objDiv.style = "float:left;  width: 180px; height: 90px; margin: 0px 10px; background: url(img/cook.png) left center no-repeat; background-size: auto 100%;";
        var objUl = document.createElement("ul");
        objUl.style = "float:right;";
        
        var objLi = document.createElement("li");
        objLi.innerHTML = "姓名:" + Restaurant.getInstance().staffCook[index].name;
        objUl.appendChild(objLi);
        var objLi = document.createElement("li");
        objLi.innerHTML = "状态:" + Restaurant.getInstance().staffCook[index].strState;
        objUl.appendChild(objLi);
        var objLi = document.createElement("li");
        objLi.innerHTML = "用时:" + Restaurant.getInstance().staffCook[index].time;
        objUl.appendChild(objLi);

        objDiv.appendChild(objUl);
        objCooks.appendChild(objDiv);
    }
    objKitchen.appendChild(objCooks);

    //////////////////////////////////////////////////
    // 绘制大堂
    //////////////////////////////////////////////////  
    // 绘制客人
    var objHall = document.getElementById("hall");
    for (var i = 0; i < Restaurant.getInstance().seats; i++) {
        var objSeat = document.createElement("div");
        objSeat.innerHTML = "【" + i + "号桌】";
        objSeat.style = "float:left;  width: 215px; height: 95px; margin: 0px 2px; background: url(img/table.png) left bottom no-repeat; background-size: auto 80%;";
        objHall.appendChild(objSeat);
    }
    var objWaiterRoom = document.getElementById("waiterRoom");
    objWaiterRoom.innerHTML = "";

    // 绘制服务生
    for (var i = 0; i < Restaurant.getInstance().staffWaiter.length; i++) {
        var objWaiter = document.createElement("div");
        objWaiter.innerHTML = "【" + Restaurant.getInstance().staffWaiter[i].name + "】\n" + Restaurant.getInstance().staffWaiter[i].strState;
        objWaiter.style = "position:absolute; text-align:center; width: 70px; height: 120px; background: url(img/waiter.png) no-repeat center bottom; background-size: auto 75%;";
        objWaiter.style.top = _hashWaiterPosition[Restaurant.getInstance().staffWaiter[i].nState][0];
        objWaiter.style.left = _hashWaiterPosition[Restaurant.getInstance().staffWaiter[i].nState][1];
        objWaiterRoom.appendChild(objWaiter);
    }
}

// 刷新来了来一名客人
function funCustomerComming() {
    var cuer = new Customer();
    // 将客人压入餐馆
    Restaurant.getInstance().funPushQueue(cuer);
    
}

// 每隔1秒钟刷新界面数据
function funUpdateDOM() {
    // 刷新餐厅状态
    var objCash = document.getElementById("cash");
    objCash.innerHTML = Restaurant.getInstance().cash;
    var objSeats = document.getElementById("seats");
    objSeats.innerHTML = Restaurant.getInstance().seats;
    var objOut = document.getElementById("nOut");
    objOut.innerHTML = Restaurant.getInstance().nOut;
    var objCook = document.getElementById("staff_cook");
    objCook.innerHTML = "厨师：";
    for(var index in Restaurant.getInstance().staffCook) {
        objCook.innerHTML += "[" + Restaurant.getInstance().staffCook[index].name + "](" + Restaurant.getInstance().staffCook[index].salary + ") ";
    }
    var objWaiter = document.getElementById("staff_waiter");
    objWaiter.innerHTML = "服务生：";
    for(var index in Restaurant.getInstance().staffWaiter) {
        objWaiter.innerHTML += "[" + Restaurant.getInstance().staffWaiter[index].name + "](" + Restaurant.getInstance().staffWaiter[index].salary + ") ";
    }

    // 刷新厨房订单
    var objP = document.getElementById("queueTableTitle");
    objP.innerHTML = "【待做的菜】(" + _queueCooking.length + ")";
    var objUl = document.getElementById("queueTable");
    objUl.innerHTML = "";
    for (var i in _queueCooking) {
        var objLi = document.createElement("li");
        objLi.innerHTML = "[" + _queueCooking[i][1] + "桌]" + Menu.getInstance().list[_queueCooking[i][0]].name;
        objUl.appendChild(objLi); 
    }
    // 刷新完菜列表
    var objP = document.getElementById("queueFinishTitle");
    objP.innerHTML = "【做完的菜】(" + _queueFinishing.length + ")";
    var objUl = document.getElementById("queueFinish");
    objUl.innerHTML = "";
    for (var i in _queueFinishing) {
        var objLi = document.createElement("li");
        objLi.innerHTML = "[" + _queueFinishing[i][1] + "桌]" + Menu.getInstance().list[_queueFinishing[i][0]].name;
        objUl.appendChild(objLi); 
    }

    // 刷新厨师状态
    var objCooks = document.getElementById("Cooks");
    objCooks.innerHTML = "";
    for (var index in Restaurant.getInstance().staffCook) {
        var objDiv = document.createElement("div");
        objDiv.style = "float:left;  width: 180px; height: 90px; margin: 0px 10px; background: url(img/cook.png) left center no-repeat; background-size: auto 100%;";
        var objUl = document.createElement("ul");
        objUl.style = "float:right;";
        var objLi = document.createElement("li");
        objLi.innerHTML = "姓名:" + Restaurant.getInstance().staffCook[index].name;
        objUl.appendChild(objLi);
        var objLi = document.createElement("li");
        objLi.innerHTML = "状态:" + Restaurant.getInstance().staffCook[index].strState;
        objUl.appendChild(objLi);
        var objLi = document.createElement("li");
        objLi.innerHTML = "用时:" + Restaurant.getInstance().staffCook[index].time;
        objUl.appendChild(objLi);

        objDiv.appendChild(objUl);
        objCooks.appendChild(objDiv);
    }

    // 刷新大堂情况
    var objHall = document.getElementById("hall");
    objHall.innerHTML = "";
    for (var i = 0; i < Restaurant.getInstance().seats; i ++) {
        var objSeat = document.createElement("div");
        objSeat.innerHTML = "【" + i + "号桌】";
        if ("空座" == Restaurant.getInstance().arrIn[i]) {
            objSeat.style = "float:left;  width: 215px; height: 95px; margin: 0px 2px; background: url(img/table.png) left bottom no-repeat; background-size: auto 80%;";
            objHall.appendChild(objSeat);
        } else {
            objSeat.style = "float:left; width: 215px; height: 95px; margin: 0px 2px;";
            var objDiv = document.createElement("div");
            objDiv.style = "width:75px; height:75px;"
            objDiv.style.backgroundImage = "url(img/customer.png)";
            objDiv.style.backgroundRepeat = "no-repeat";
            objDiv.style.backgroundPosition = _face[Restaurant.getInstance().arrIn[i].nFace];
            objSeat.appendChild(objDiv);

            var objUl = document.createElement("ul");
            objUl.style = "float:left; position: relative; top: -80px; left: 80px;";
            var objLi = document.createElement("li");
            objLi.innerHTML = "姓名:" + Restaurant.getInstance().arrIn[i].name;
            objUl.appendChild(objLi);
            var objLi = document.createElement("li");
            objLi.innerHTML = "状态:" + Restaurant.getInstance().arrIn[i].strState;
            objUl.appendChild(objLi);
            var objLi = document.createElement("li");
            objLi.innerHTML = "动作编码:" + Restaurant.getInstance().arrIn[i].nState;
            objUl.appendChild(objLi);
            objSeat.appendChild(objUl);
            objHall.appendChild(objSeat);
        }
    }
    var objWaiterRoom = document.getElementById("waiterRoom");
    objWaiterRoom.innerHTML = "";

    // 刷新服务生
    for (var i = 0; i < Restaurant.getInstance().staffWaiter.length; i++) {
        var objWaiter = document.createElement("div");
        objWaiter.innerHTML = "【" + Restaurant.getInstance().staffWaiter[i].name + "】\n" + Restaurant.getInstance().staffWaiter[i].strState;
        objWaiter.style = "position:absolute; text-align:center; width: 70px; height: 120px; background: url(img/waiter.png) no-repeat center bottom; background-size: auto 75%;";
        objWaiter.style.top = _hashWaiterPosition[Restaurant.getInstance().staffWaiter[i].nState][0];
        objWaiter.style.left = _hashWaiterPosition[Restaurant.getInstance().staffWaiter[i].nState][1];
        objWaiterRoom.appendChild(objWaiter);
    }

    // 

    // 刷新门外排队状态
    var objOutside = document.getElementById("outside");
    objOutside.innerHTML = "等位区：</br>";
    for (var i = 0; i < Restaurant.getInstance().queueOut.length; i++) {
        var objChair = document.createElement("div");
        objChair.style = "float:left; width: 180px; height: 80px; margin: 5px 5px; border: 1px solid #000000;";
        var objDiv = document.createElement("div");
        objDiv.style = "width:75px; height:75px; margin-top: 5px;";
        objDiv.style.backgroundImage = "url(img/customer.png)";
        objDiv.style.backgroundRepeat = "no-repeat";
        objDiv.style.backgroundPosition = _face[Restaurant.getInstance().queueOut[i].nFace];
        objChair.appendChild(objDiv);

        var objUl = document.createElement("ul");
        objUl.style = "float:left; position:relative; top: -60px; left:80px;";
        var objLi = document.createElement("li");
        objLi.innerHTML = "姓名:" + Restaurant.getInstance().queueOut[i].name;
        objUl.appendChild(objLi);
        var objLi = document.createElement("li");
        objLi.innerHTML = "状态:" + Restaurant.getInstance().queueOut[i].strState;
        objUl.appendChild(objLi);

        objChair.appendChild(objUl);
        objOutside.appendChild(objChair);
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
    // 初始化界面
    funInitUI();
    // 设置定时器
    
    // 来客(1-4秒随机)
    _t1 = setInterval(funCustomerComming, (Math.floor(Math.random() * 3) + 1) * _nBaseTime);
    // 刷新
    _t0 = setInterval(funUpdateDOM, 0.25 * _nBaseTime);


    // 事件绑定
    // 按钮
    // var objBtnOpen = document.getElementById("btn_open");
    // objBtnOpen.addEventListener("click", funEventClickOpen);
    // var objBtnClose = document.getElementById("btn_close");
    // objBtnClose.addEventListener("click", funEventClickClose);
    // var objBtnAddSeat = document.getElementById("btn_addSeat");
    // objBtnAddSeat.addEventListener("click", funEventClickAddSeat);
    // var objBtnRemoveSeat = document.getElementById("btn_removeSeat");
    // objBtnRemoveSeat.addEventListener("click", funEventClickRemoveSeat);

    // 鼠标扫过
    var objCap = document.getElementById("queueTableCap");
    objCap.addEventListener("mouseover", funEventOverTableCap);
    objCap.addEventListener("mouseout", funEventOutTableCap);
    var objCap = document.getElementById("queueFinishCap");
    objCap.addEventListener("mouseover", funEventOverFinishCap);
    objCap.addEventListener("mouseout", funEventOutFinishCap);
}