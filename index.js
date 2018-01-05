
i = 0;
j = 0;
count = 0;
MM = 0;
SS = 60; // 秒 90s
MS = 0;
totle = (MM + 1) * 600;
d = 180 * (MM + 1);
MM = "0" + MM;
var gameTime = 30;
//count down
var showTime = function () {
    totle = totle - 1;
    if (totle == 0) {
        clearInterval(s);
        clearInterval(t1);
        clearInterval(t2);
        $(".pie2").css("-o-transform", "rotate(" + d + "deg)");
        $(".pie2").css("-moz-transform", "rotate(" + d + "deg)");
        $(".pie2").css("-webkit-transform", "rotate(" + d + "deg)");
    }
    else {
        if (totle > 0 && MS > 0) {
            MS = MS - 1;
            if (MS < 10) {
                MS = "0" + MS
            };
        };
        if (MS == 0 && SS > 0) {
            MS = 10;
            SS = SS - 1;
            if (SS < 10) {
                SS = "0" + SS
            };
        };
        if (SS == 0 && MM > 0) {
           
            SS = 60;
            MM = MM - 1;
            if (MM < 10) {
                MM = "0" + MM
            };
        };
    };
    $(".time").html(SS + "s");
    if(SS==0)
    {
        $("#canvas").fadeOut();
       $(".a").fadeIn();
        $(".d").fadeIn();
        $(".game_time").fadeOut();
       
       var iptTxt = document.getElementById('e');
    //假如a是你需要的变量，那么可以通过获取iptTxt的value值来赋值给a
       iptTxt.value=num; 
         $(".b").fadeIn();
    }
};
var start1 = function () {
    //i = i + 0.6;
    i = i + 360 / ((gameTime) * 10); //旋转的角度  90s 为 0.4  60s为0.6
    count = count + 1;
    if (count <= (gameTime / 2 * 10)) { // 一半的角度  90s 为 450
        $(".pie1").css("-o-transform", "rotate(" + i + "deg)");
        $(".pie1").css("-moz-transform", "rotate(" + i + "deg)");
        $(".pie1").css("-webkit-transform", "rotate(" + i + "deg)");
    }
    else {
        $(".pie2").css("backgroundColor", "#d13c36");
        $(".pie2").css("-o-transform", "rotate(" + i + "deg)");
        $(".pie2").css("-moz-transform", "rotate(" + i + "deg)");
        $(".pie2").css("-webkit-transform", "rotate(" + i + "deg)");
    }
};
var start2 = function () {
    j = j + 0.6;
    count = count + 1;
    if (count == 300) {
        count = 0;
        clearInterval(t2);
        t1 = setInterval("start1()", 100);
    }
    $(".pie2").css("-o-transform", "rotate(" + j + "deg)");
    $(".pie2").css("-moz-transform", "rotate(" + j + "deg)");
    $(".pie2").css("-webkit-transform", "rotate(" + j + "deg)");
}
var countDown = function () {
    //80*80px 时间进度条
    i = 0;
    j = 0;
    count = 0;
    MM = 0;
    SS = gameTime;
    MS = 0;
    totle = (MM + 1) * gameTime * 10;
    d = 180 * (MM + 1);
    MM = "0" + MM;
    showTime();
    s = setInterval("showTime()", 100);
    start1();
    t1 = setInterval("start1()", 100);
   
}
$(".c").click(function(){
 $(".a").fadeOut();
$(".game_time").fadeIn();
    countDown();
})

var arr = ["fish.png", "ship.png", "line.png","fish1.png"];
var can = document.getElementById("can");
var pen = can.getContext("2d");
var fish = [];
var fish1=[];
var line = [];
var ship = {
    x_: 0
    , y_: 280
};
var num = 0;

imgLoads(arr, function (img) {
    pen.drawImage(img.ship, 0, 0, 200, 106, ship.x_, ship.y_, 200, 106);
    var inter = setInterval(function () {
        pen.clearRect(0, 0, 1350, 650);
        for (var j = 0; j < fish.length; j++) {
            fish[j].pic++;
            if (fish[j].pic == 8) {
                fish[j].pic = 0;
            }
            fish[j].x_ += 3
            pen.drawImage(img.fish, 0, fish[j].pic * 126, 174, 126, fish[j].x_, fish[j].y_, 174, 126);
            //pen.drawImage(img.fish1, 0, fish[j].pic * 126, 174, 126, 1350 - fish[j].x_, fish[j].y_, 174, 126);
        }
         for (var j = 0; j < fish1.length; j++) {
            fish1[j].pic++;
            if (fish1[j].pic == 8) {
                fish1[j].pic = 0;
            }
            fish1[j].x_ -= 3
            pen.drawImage(img.fish1, 0, fish1[j].pic * 126, 174, 126, fish1[j].x_, fish1[j].y_, 174, 126);
            //pen.drawImage(img.fish1, 0, fish[j].pic * 126, 174, 126, 1350 - fish[j].x_, fish[j].y_, 174, 126);
        }
        pen.drawImage(img.ship, 0, 0, 200, 106, ship.x_, ship.y_, 200, 106);

        function drawnum() {
            pen.font = 'bold 144px consolas';
            pen.strokeStyle = '#DF5326';
            length = pen.measureText(num);
            pen.strokeText(num, 1000, 100);
        }
        drawnum();
        for (var i = 0; i < line.length; i++) {
            line[i].pic += 4;
            if (line[i].y_ < 500) {
                line[i].y_ = line[i].y_ + 10;
                pen.drawImage(img.line, 0, line[i].pic * 2, 1, line[i].y_, ship.x_ + 7, ship.y_ + 36, 1, line[i].y_);
                //pen.clearRect( ship.x_ + 7, ship.y_ +line[i].y_, 1, 1);
                for (var k = 0; k < fish.length; k++) {
                   
                    var status = crash(fish[k].x_, fish[k].y_, 174, 126, ship.x_ + 7, ship.y_ +line[i].y_, 1, 1);
                    
                    if (status) {
                        fish.splice(k, 1);
                        //                
                        num++;
                        drawnum();
                    }
                     pen.clearRect( ship.x_ + 7, ship.y_ +line[i].y_, 1, 1);
                }
            
            for (var k = 0; k < fish1.length; k++) {
                   
                    var status = crash(fish1[k].x_, fish1[k].y_, 174, 126, ship.x_ + 7, ship.y_ +line[i].y_, 1, 1);
                    
                    if (status) {
                        fish1.splice(k, 1);
                        //                
                        num++;
                        drawnum();
                    }
                     pen.clearRect( ship.x_ + 7, ship.y_ +line[i].y_, 1, 1);
                }
            }
            else {
                line[i].y_ = ship.y_ + 2;
                pen.drawImage(img.line, 0, line[i].pic * 2, 1, line[i].y_, ship.x_ + 7, ship.y_ + 36, 1, line[i].y_);
            }
        }
    }, 1000 / 30);
});
setInterval(function () {
        var random_ = Math.ceil(Math.random() * 100);
        var random1_ = Math.ceil(Math.random() * 100);
        console.log(random_);
        fish.push({
            x_: -100
            , y_: 370 + random_
            , pic: 0
        });
    fish1.push({
        x_:1450,
        y_:370+random1_,
        pic:0})
    }, 2000)
    //懒加载的方法
function imgLoads(arr, callBack_) {
    var json = {}; //存储我们的图片对象
    var len = arr.length;
    var load = 0;
    for (var i = 0; i < len; i++) {
        var img = new Image();
        img.onload = function () {
            load++;
            if (load == len) {
                callBack_(json);
            }
        }
        img.src = arr[i];
        var key_ = arr[i].split(".")[0];
        json[key_] = img;
    }
}
window.onkeydown = function (e) {
        var key_ = e.keyCode;
        switch (key_) {
        case 37: //键盘上下左右 左方向键
            if (ship.x_ > 10) ship.x_ -= 5;
            break;
        case 39: //键盘上下左右 右方向键
            if (ship.x_ < 1300) ship.x_ += 5;
            break;
        case 32: //空格键 增加炮弹
            line.push({
                pic: 0
                , y_: 0
            })
        }
    }
    //碰撞检测
function crash(x1, y1, w1, h1, x2, y2, w2, h2) {
    var l1 = x1;
    var r1 = x1 + w1;
    var t1 = y1;
    var b1 = y1 + h1;
    var l2 = x2;
    var r2 = x2 + w2;
    var t2 = y2;
    var b2 = y2 + h2;
    if (r1 < l2 || l1 > r2 || t1 > b2 || b1 < t2) {
        return false;
    }
    else {
        return true;
    }
}