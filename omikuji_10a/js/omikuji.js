"use strict";

window.addEventListener("DOMContentLoaded",
  function () {
    ////ページ本体が読み込まれたときにタイミングで実行するコード


    $("header").textillate({
      loop: false,
      minDisplayTime: 2000,
      initialDelay: 2000,
      autoStart: true,
      in: {
        effect: "fadeInLeftBig",
        delayScale: 1.5,
        delay: 50,
        sync: false,
        shuffle: true
      }
    });

    // おみくじボタン(id="btn1") ボヤァと表示させる
    $(function () {
      ScrollReveal().reveal("#btn1", { duration: 9000 });
    });
    this.setTimeout(
      function () {
        //ぽップアップメッセージ
        let popMessage = "いらっしゃい。。。いらっしゃい。。。おみくじ。";
        this.window.alert(popMessage);

      },
      "5500"
    )

  }, false
);
let soundEndflag = "0";

//おみくじの画像、おみくじのテキスト
const btn1 = document.getElementById("btn1");
const omikujiText = document.getElementById("omikujiText");
btn1.addEventListener("click",
  function () {
    if (soundEndflag === "1") {
      soundControl("end", "");
    }
    let resultText = ["大吉!!!", "吉!!!", "中吉!!!", "小吉!!!", "末吉!", "凶。。"];
    let resultColor = ["#ff0000", "#c71585", "#ff1493", "#ff69b4", "#ff8c00", "#1e90ff"];
    let resultFontSize = ["90px", "80px", "70px", "60px", "50px", "40px"];
    let resultMaxSpeed = [10, 10, 8, 5, 5, 5];
    let resultMaxSize = [30, 30, 20, 15, 20, 20];
    let resultImage = [
      "img/star.png",
      "img/sakura_hanabira.png",
      "img/sakura_hanabira.png",
      "img/sakura_hanabira.png",
      "img/leaf.png",
      "img/snowflakes.png"
    ];

    let resultSound = [
      "sound/omikuji_sound1.mp3",
      "sound/omikuji_sound2.mp3",
      "sound/omikuji_sound2.mp3",
      "sound/omikuji_sound2.mp3",
      "sound/omikuji_sound2.mp3",
      "sound/omikuji_sound3.mp3",
    ]

    let n = Math.floor(Math.random() * resultText.length);
    omikujiText.textContent = resultText[n];
    omikujiText.style.color = resultColor[n];
    omikujiText.style.fontSize = resultFontSize[n];
    //sound control
    w_sound = resultSound[n];
    soundControl("start", w_sound);
    soundEndflag = "1";


    // snowfall stop
    $(document).snowfall("clear");
    // jQueryのsnowfall
    $(document).ready(function () {
      $(document).snowfall({
        maxSpeed: resultMaxSpeed[n], // 最大速度
        minSpeed: 1, // 最小速度
        maxSize: resultMaxSize[n], // 最大サイズ
        minSize: 1, // 最小サイズ
        image: resultImage[n]
      });
    });
  }, false
);

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