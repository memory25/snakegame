var speed = 300,
    speedCount = 1,
    movetimer /*蛇頭移動計時器*/ ,
    snakeInitialLeng = 3 /*原始身體長度--當開關用*/ ,
    snakeleng = snakeInitialLeng /*身體長度--計算用變長*/ ,
    foodPosX, foodPosY /*食物座標*/ ,
    bodyMoveSwitch /*控制撞到自己身體遊戲結束開關*/ ,
    scoreCount = 0,
    difficult,
    foodColorR = new Array(),
    foodColorG = new Array(),
    foodColorB = new Array() /*食物顏色RGB*/ ,
    snakeRecordX = new Array(),
    snakeRecordY = new Array() /*蛇頭座標*/

/*初始畫面 選定模式*/
document.getElementById("snake").style.transform = "translate(290px,200px)"; /*未開始前蛇的位置*/
document.getElementById("snakeFood").style.transform = "translate(295px,175px)"; /*未開始前食物的位置*/
document.getElementById("difficultNormal").onclick = function() {
    document.getElementById("difficultNormal").className = "difficultCheckin"
    document.getElementById("difficultHard").className = ""
    document.getElementById("difficultHell").className = ""
    difficult = "normal"
}
document.getElementById("difficultHard").onclick = function() {
    document.getElementById("difficultNormal").className = ""
    document.getElementById("difficultHard").className = "difficultCheckin"
    document.getElementById("difficultHell").className = ""
    difficult = "hard"
}
document.getElementById("difficultHell").onclick = function() {
    document.getElementById("difficultNormal").className = ""
    document.getElementById("difficultHard").className = ""
    document.getElementById("difficultHell").className = "difficultCheckin"
    difficult = "hell"
}
/*初始畫面 選定模式*/

/*開始遊戲*/
document.getElementById("starGame").onclick = function() {
    if (document.getElementById("snakeLength").value < 3 || document.getElementById("snakeLength").value > 300) {
        alert("請輸入想要的蛇身長度 3~300")
    } else if (difficult == null) {
        alert("請先選擇難度");
    } else {
        for (var i = -1; i > -400; i--) {
            snakeRecordX[i] = -1999;
            snakeRecordY[i] = -1999;
            /*讓影子一個接一個出來 而非一次全部出來*/
        }
        var snakebornPos = snakeborn();
        initialgame();
        snakeFood();
        snakeMove(snakebornPos[0], snakebornPos[1], 8);
        document.getElementById("snakeLength").className = "displayNone";
        document.getElementById("difficultNormal").className = "displayNone";
        document.getElementById("difficultHard").className = "displayNone";
        document.getElementById("difficultHell").className = "displayNone";
        document.getElementById("starGame").className = "displayNone";
        snakeInitialLeng = document.getElementById("snakeLength").value /*原始身體長度--當開關用*/ ,
            snakeleng = snakeInitialLeng
        document.getElementById("showDifficult").innerHTML = difficult

    }
}
/*開始遊戲*/

/*蛇死亡遊戲結束 再玩一次*/
function gameover() {
    bodyMoveSwitch = 0 /*死亡後避免蛇頭還可以亂動*/
    document.getElementById("gameover").className = ""
    document.getElementById("again").className = ""
    document.getElementById("again").onclick = function() {
        document.getElementById("snakeLength").className = "";
        document.getElementById("snakeLength").value = "";
        document.getElementById("difficultNormal").className = "";
        document.getElementById("difficultHard").className = "";
        document.getElementById("difficultHell").className = "";
        document.getElementById("starGame").className = "";
        document.getElementById("gameover").className = "displayNone";
        document.getElementById("again").className = "displayNone";
    }
}
/*蛇死亡遊戲結束*/

function initialgame() {
    speed = 300;
    speedCount = 1;
    snakeInitialLeng = 3 /*原始身體長度--當開關用*/ ;
    snakeleng = snakeInitialLeng /*身體長度--計算用變長*/ ;
    bodyMoveSwitch = " " /*控制撞到自己身體遊戲結束開關*/ ;
    scoreCount = 0;
    foodColorR.length = 0;
    foodColorG.length = 0;
    foodColorB.length = 0 /*食物顏色RGB*/ ;
    snakeRecordX.length = 0;
    snakeRecordY.length = 0;
    document.getElementById("snake").style.transform = "translate(0,0)";
    document.getElementById('snakeBodyShadow').style.boxShadow = "";
    document.getElementById("snake").className = "turnTop";
    document.getElementById("scoreNav-1").style.width = 0;
    document.getElementById("scoreNav-2").style.width = 0;
    document.getElementById("scoreNav-3").style.width = 0;
    document.getElementById("scoreNav-4").style.width = 0;
    document.getElementById("scoreGreat").className = "displayNone";
    document.getElementById("speedCount").innerHTML = speedCount;
}

/*隨機生成食物*/
function snakeFood() {
    foodPosX = Math.floor(Math.random() * 22 + 4) * 20 + 5;
    foodPosY = Math.floor(Math.random() * 22 + 4) * 20 + 5;
    var foodPos = "translate(" + foodPosX + "px," + foodPosY + "px)";
    document.getElementById("snakeFood").style.transform = foodPos
    var foodColor_1 = Math.floor(Math.random() * 256),
        foodColor_2 = Math.floor(Math.random() * 256),
        foodColor_3 = Math.floor(Math.random() * 256);
    document.getElementById("snakeFood").style.background = "rgb(" + foodColor_1 + "," + foodColor_2 + "," + foodColor_3 + ")";
    foodColorR.push(foodColor_1);
    foodColorG.push(foodColor_2);
    foodColorB.push(foodColor_3);
}
/*隨機生成食物*/


/*隨機生成蛇的位置*/
function snakeborn() {
    var snakePosX = Math.floor(Math.random() * 11 + 10) * 20,
        snakePosY = Math.floor(Math.random() * 11 + 10) * 20,
        snakePos = "translate(" + snakePosX + "px," + snakePosY + "px)";
    document.getElementById("snake").style.transform = snakePos;
    return [snakePosX, snakePosY]
}
/*隨機生成蛇的位置*/

/*蛇頭移動*/
function snakeMove(posX, posY, direction) {
    if (posX <= 0 || posY <= 0 || posX >= 580 || posY >= 580)
        //if (posX <= 300 || posY <= 300 || posX >= 580 || posY >= 580)
        return gameover();
    /*方向控制*/
    document.onkeydown = function(e) {
        if ((e.which == 37 || e.keyCode == 37) && posX > 0 && bodyMoveSwitch != 0) {
            if (direction == 6) {} else {
                direction = 4;
                console.log(123 + ",," + posX)
                document.getElementById("snake").className = "turnLeft"
                clearTimeout(movetimer);
                return snakeMove(posX, posY, direction)
            }
        } else if ((e.which == 38 || e.keyCode == 38) && posY > 0 && bodyMoveSwitch != 0) {
            if (direction == 2) {} else {
                direction = 8;
                document.getElementById("snake").className = "turnTop"
                clearTimeout(movetimer);
                return snakeMove(posX, posY, direction)
            }
        } else if ((e.which == 39 || e.keyCode == 39) && posX < 580 && bodyMoveSwitch != 0) {
            if (direction == 4) {} else {
                direction = 6;
                document.getElementById("snake").className = "turnRight"
                clearTimeout(movetimer);
                return snakeMove(posX, posY, direction)
            }
        } else if ((e.which == 40 || e.keyCode == 40) && posY < 580 && bodyMoveSwitch != 0) {
            if (direction == 8) {} else {
                direction = 2;
                document.getElementById("snake").className = "turnBottom"
                clearTimeout(movetimer);
                return snakeMove(posX, posY, direction)
            }
        } else {
            direction = 0;
            clearTimeout(movetimer);
        }
    }
    /*方向控制*/
    switch (direction) {
        case 8:
            posY -= 20
            break;
        case 6:
            posX += 20
            break;
        case 4:
            posX -= 20
            break;
        case 2:
            posY += 20;
            break;
    }
    snakeRecordX.push(posX) /*紀錄蛇頭的位置*/
    snakeRecordY.push(posY)
    bodyMoveSwitch = snakeBody(snakeRecordX, snakeRecordY)
    if (bodyMoveSwitch == 0) {
        /*撞到自己身體時 遊戲結束*/
        return gameover();
    }

    /*每次移動*/
    countScore(2)
    /*分數+2*/
    document.getElementById("snake").style.transform = "translate(" + posX + "px," + posY + "px)";
    var snakeSettime = "snakeMove(" + posX + "," + posY + "," + direction + ")"
    movetimer = setTimeout(snakeSettime, speed)
}
/*蛇頭移動*/

/*身體長度*/
function snakeBody(x, y) {
    if (x[x.length - 1] == (foodPosX - 5) && y[y.length - 1] == (foodPosY - 5)) {
        /*吃到食物身體長度+1 食物點刷新 速度加快 分數上升*/
        snakeFood()
        snakeleng++
        scoreBar()
        countSpeed()
        countScore(1)
        /*吃到食物身體長度+1 食物點刷新 速度加快 分數上升*/
    }
    for (var i = x.length - snakeleng; i < x.length - 3; i++) {
        if (x[x.length - 1] == x[i] && y[y.length - 1] == y[i]) {
            return 0 /*撞到自己身體就死亡*/
        }
    }
    if (x[x.length - 1] == x[x.length - 2] && y[y.length - 1] == y[y.length - 2]) {
        /*暫停後避免影子全集中在一個點*/
        return 0
    }
    /*  for(var i=0;i<x.length;i++){
    帶入身體執行 測試
        document.getElementById('snakeBodyShadow').style.boxShadow = bodyMove(x,y,i)
        }*/
    if (x.length > 0) {
        /*帶入身體數值執行*/
        document.getElementById('snakeBodyShadow').style.boxShadow = bodyMove(x, y, x.length - 1)
    }
}
/*身體長度*/

/*蛇身體移動*/
function bodyMove(x, y, i) {
    var bodymove = x[i - 1] + "px " + y[i - 1] + "px rgba(242, 4, 55,0.7)" + "," + x[i - 2] + "px " + y[i - 2] + "px rgba(242, 4, 55,0.4)"
    /*增加身體長度*/
    for (var j = 3; j < snakeInitialLeng; j++) {
        /**/
        bodymove += "," + x[i - j] + "px " + y[i - j] + "px 0 " + "-0.1" + "px rgb(" + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + ")"
    }
    for (var j = snakeInitialLeng; j < snakeleng; j++) {
        bodymove += "," + x[i - j] + "px " + y[i - j] + "px 0 " + -(j / 100 + 2) + "px rgb(" + foodColorR[j - snakeInitialLeng] + "," + foodColorG[j - snakeInitialLeng] + "," + foodColorB[j - snakeInitialLeng] + ")"
    }
    return bodymove
}
/*蛇身體移動*/

/*周邊紀錄食物*/
function scoreBar() {
    if (snakeleng - snakeInitialLeng <= 4) {
        document.getElementById("scoreNav-1").style.width = (snakeleng - snakeInitialLeng) * 150 + "px"
    } else if (snakeleng - snakeInitialLeng >= 5 && snakeleng - snakeInitialLeng <= 8) {
        document.getElementById("scoreNav-2").style.width = (snakeleng - snakeInitialLeng - 4) * 150 + "px"
    } else if (snakeleng - snakeInitialLeng >= 9 && snakeleng - snakeInitialLeng <= 12) {
        document.getElementById("scoreNav-3").style.width = (snakeleng - snakeInitialLeng - 8) * 150 + "px"
    } else if (snakeleng - snakeInitialLeng >= 13 && snakeleng - snakeInitialLeng <= 16) {
        document.getElementById("scoreNav-4").style.width = (snakeleng - snakeInitialLeng - 12) * 150 + "px"
    } else if (snakeleng - snakeInitialLeng >= 17) {
        document.getElementById("scoreGreat").className = ""
        /*閃爍用*/
    }
}
/*周邊紀錄食物*/

/*顯示分數用*/
function countScore(scoreclass) {
    if (scoreclass == 1) {
        if (speed > 200) {
            scoreCount += 100
        } else if (speed > 110) {
            scoreCount += 300
        } else if (speed > 45) {
            scoreCount += 500
        } else if (speed > 30) {
            scoreCount += 1000
        }
    } else if (scoreclass == 2) {
        scoreCount += 2
    }

    document.getElementById("scoreCount").innerHTML = scoreCount
}

/*顯示速度用*/
function countSpeed() {
    if (difficult == "normal") {
        if (speed > 200) {
            speed -= 50;
            speedCount = Math.floor(10000 / speed) / 10
            document.getElementById("speedCount").innerHTML = speedCount
        } else if (speed > 110) {
            speed -= 30
            speedCount = Math.floor(10000 / speed) / 10
            document.getElementById("speedCount").innerHTML = speedCount
        } else if (speed > 60) {
            speed -= 10
            speedCount = Math.floor(10000 / speed) / 10
            document.getElementById("speedCount").innerHTML = speedCount
        } else if (speed > 44) {
            speed -= 2
            speedCount = Math.floor(10000 / speed) / 10
            document.getElementById("speedCount").innerHTML = speedCount
        }
    } else if (difficult == "hard") {
        if (speed > 200) {
            speed -= 50;
            speedCount = Math.floor(10000 / speed) / 10
            document.getElementById("speedCount").innerHTML = speedCount
        } else if (speed > 110) {
            speed -= 30
            speedCount = Math.floor(10000 / speed) / 10
            document.getElementById("speedCount").innerHTML = speedCount
        } else if (speed > 35) {
            speed -= 15
            speedCount = Math.floor(10000 / speed) / 10
            document.getElementById("speedCount").innerHTML = speedCount
        } else if (speed > 30) {
            speed -= 2
            speedCount = Math.floor(10000 / speed) / 10
            document.getElementById("speedCount").innerHTML = speedCount
        }
    } else if (difficult == "hell") {
        if (speed > 200) {
            speed -= 50;
            speedCount = Math.floor(10000 / speed) / 10
            document.getElementById("speedCount").innerHTML = speedCount
        } else if (speed > 80) {
            speed -= 40
            speedCount = Math.floor(10000 / speed) / 10
            document.getElementById("speedCount").innerHTML = speedCount
        } else if (speed > 40) {
            speed -= 15
            speedCount = Math.floor(10000 / speed) / 10
            document.getElementById("speedCount").innerHTML = speedCount
        } else if (speed > 17) {
            speed -= 3
            speedCount = Math.floor(10000 / speed) / 10
            document.getElementById("speedCount").innerHTML = speedCount
        }
    }
}



document.getElementById("tt").onclick = function() {
    snakeleng++
    scoreBar()
}