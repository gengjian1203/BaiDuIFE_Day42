// arrCooking[0]    菜品编号
// arrCooking[1]    归属座位

// 承装员工ID
let _nWorkerID = 0;

// 顾客随机姓名
let _arrFirst = ["赵","钱","孙","李","周","吴","郑","王","冯","陈","褚","卫","蒋","沈","韩","杨"];
let _arrSecond = ["彪","巨昆","锐","花","小小","撒撒", "萧", "慕", "紫韵", "娜", "怜花", "月", "风", "云", "霜", "伟", "岩"];
let _face = ["0px -15px", "-60px -15px", "-123px -15px", "-185px -15px", 
             "0px -90px", "-60px -90px", "-123px -90px", "-185px -90px", 
             "0px -180px", "-60px -180px", "-123px -180px", "-185px -180px"];

// 服务生
// let _hashWaiterState = { "-1": "正在待命", 
//                          "0": "正在工作",
//                         }

//                                top     left
let _hashWaiterPosition = { "-1": ["80px", "0px"],
                            "0": ["2px", "270px"],
                            "1": ["2px", "490px"],
                            "2": ["2px", "720px"],
                            "3": ["104px", "270px"],
                            "4": ["104px", "490px"],
                            "5": ["104px", "720px"],
                            "10": ["-85px", "10px"], 
                          }

// 做菜序列
let _queueCooking = [];
// 完菜序列
let _queueFinishing = [];

// 餐桌序列
let _queueSeatCook = [];


// 基本时间单位
let _nBaseTime = 1000;

// 定时器编号
// 来客定时器
let _t1 = null;
// 刷新定时器
let _t0 = null;