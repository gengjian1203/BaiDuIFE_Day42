// 开业
function funEventClickOpen() {
    if (null != _t1) {
        _t1 = setInterval(funCustomerComming, (Math.floor(Math.random() * 5) + 2) * _nBaseTime);
    }
}

// 打烊
function funEventClickClose() {
    clearInterval(_t0);
    _t0;
    clearInterval(_t1);
    _t1 = null;

    // 做菜序列
    _queueCooking.length = 0;
    // 餐桌序列
    _queueSeatCook.length = 0;
    // 餐厅类中
    var obj = Restaurant.getInstance();
    obj.queueOut.length = 0;
    for (var i in Restaurant.getInstance().arrIn) {
        Restaurant.getInstance().arrIn[i] = "空座";
    }

    // 刷新
    _t0 = setInterval(funUpdateDOM, _nBaseTime);
}


// 
function funEventClickAddSeat() {

}

function funEventClickRemoveSeat() {

}

function funEventOverTableCap() {
    // console.log("move over.");
    var objUl = document.getElementById("queueTable");
    objUl.style.display = "block";
}

function funEventOutTableCap() {
    // console.log("move out.");
    var objUl = document.getElementById("queueTable");
    objUl.style.display = "none";
}

function funEventOverFinishCap() {
    // console.log("move over.");
    var objUl = document.getElementById("queueFinish");
    objUl.style.display = "block";
}

function funEventOutFinishCap() {
    // console.log("move out.");
    var objUl = document.getElementById("queueFinish");
    objUl.style.display = "none";
}

