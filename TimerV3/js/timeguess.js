"use strict";

const message = document.querySelector(".message-container")
const timer = document.getElementById("timer");
const start = document.getElementById("start");
const stop = document.getElementById("stop");
const reset = document.getElementById("reset");

// const soundStart = new Audio("./sound/start.mp3");
// const soundStop1 = new Audio("./sound/stop1.mp3");
// const soundStop2 = new Audio("./sound/stop3.mp3");
// const soundReset = new Audio("./sound/reset.mp3");

let startTime; // Startボタンクリック時の時刻
let timeoutid; // ID
let stopTime = 0; // Stopまでの経過時間

let soundEndflag = "0";

// ボタンを"初期"状態とする
setButtonStateInitial()

////////////////////////
// Startボタンクリック
////////////////////////
start.addEventListener("click",
    function() {
        // ボタンをタイマー"動作中"状態とする
        // sound countrol
        if (soundEndflag === "1") {
            soundControl("end", "");
        }
        soundControl("start", "./sound/start.mp3"); //サウンド
        soundEndflag = "1";
        setButtonStateRunning();
        startTime = Date.now();
        countUp();

    }, false
);

////////////////////////
// Stopボタンクリック
////////////////////////
stop.addEventListener("click",
    function() {
        const checkTimer = Date.now() - startTime;
        //fix time 
        if (checkTimer >= 10000 && checkTimer < 11000) {
            soundControl("start", "./sound/stop2.mp3");
            document.body.classList.remove("defaultBackground");
            document.body.classList.add("tenSecond");
            message.classList.add("tenSecond");
        } else {
            soundControl("start", "./sound/stop1.mp3");
        }

        // タイマーを"停止中"状態とする
        setButtonStateStopped();
        clearTimeout(timeoutid); //setTimeout()でセットしたタイマーを解除する際に使用

        stopTime = Date.now() - startTime;

    }, false
);

////////////////////////
// Resetボタンクリック
////////////////////////
reset.addEventListener("click",
    function() {
        if (soundEndflag === "1") {
            soundControl("end", "");
        }
        soundControl("start", "./sound/reset.mp3"); //サウンド
        soundEndflag = "1";
        // ボタンを"初期"状態とする
        setButtonStateInitial();
        document.body.classList.remove("tenSecond");
        document.body.classList.add("defaultBackground");
        // document.querySelector(".message-container").classList.add(".message-container.tenSecond"); dekinai :(
        message.classList.remove("tenSecond");
        timer.textContent = "00:00.000";
        stopTime = 0;
    }
);


function countUp() {
    const d = new Date(Date.now() - startTime + stopTime);
    /* padStart()で２桁固定表示とする */
    const m = String(d.getMinutes()).padStart(2, "0");
    const s = String(d.getSeconds()).padStart(2, "0");
    const ms = String(d.getMilliseconds()).padStart(3, "0");
    /* 描画 */
    timer.textContent = `${m}:${s}.${ms}`;

    timeoutid = setTimeout(() => {
        //再帰呼び出し
        countUp();
    }, 10);
}

// 初期 または Reset後
function setButtonStateInitial() {
    start.classList.remove("js-inactive");
    stop.classList.add("js-inactive");
    reset.classList.add("js-inactive");
    start.classList.remove("js-unclickable");
    stop.classList.add("js-unclickable");
    reset.classList.add("js-unclickable");
}

// 状態:タイマー動作中
function setButtonStateRunning() {
    timer.classList.add("timer-fontColor_hidden"); //時間を見えなくする
    start.classList.add("js-inactive"); // 非活性
    stop.classList.remove("js-inactive"); // 活性
    reset.classList.add("js-inactive"); // 非活性
    start.classList.add("js-unclickable");
    stop.classList.remove("js-unclickable");
    reset.classList.add("js-unclickable");
}

// 状態:タイマー停止中
function setButtonStateStopped() {
    timer.classList.remove("timer-fontColor_hidden"); //時間を見えるようにする
    timer.classList.add(".timer_appear"); //時間をゆっくり表示
    start.classList.add("js-inactive"); // 活性
    stop.classList.add("js-inactive"); // 非活性
    reset.classList.remove("js-inactive"); // 活性
    start.classList.add("js-unclickable");
    stop.classList.add("js-unclickable");
    reset.classList.remove("js-unclickable");
}

//sound control
let w_sound;
let music;

function soundControl(status, w_sound) {
    if (status == "start") {
        music = new Audio(w_sound);
        music.currentTime = 0;
        music.play();
    } else if (status === "end") {
        music.pause();
        music.currentTime = 0;
    }
}