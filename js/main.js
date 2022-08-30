"use strict";
import { Drawing } from './Drawing.js';
import { Element } from './Element.js';

const draw = new Drawing();
draw.setCanvasSize();
draw.drawPen();
draw.changePenColor();

const elem = new Element();
elem.moveElement();

// レイアウトの調整
const selectColor = document.querySelector(".select_color");
const select = document.querySelectorAll(".select_color > ul > li");
const imgChange = document.getElementById("change_pen");

const operation = document.getElementById("operation");
const operation_list = document.querySelector(".operation_list");

// switch_btn押下で要素追加とペン描画を切り替える
const switch_btn = document.querySelector("#change_pen > img");
export let judge = false;
switch_btn.addEventListener("click", (e) => {
    judge ? judge = false : judge = true;
    selectColor.classList.toggle("active");
    imgChange.children[0].classList.toggle("active_pen");
});
// 設定画面を表示する
operation.addEventListener("click", (e) => {
    operation_list.classList.toggle("active");
});

// スマホの高さ調整
// 最初に、ビューポートの高さを取得し、0.01を掛けて1%の値を算出して、vh単位の値を取得
let vh = window.innerHeight * 0.01;
// カスタム変数--vhの値をドキュメントのルートに設定
document.documentElement.style.setProperty('--vh', `${vh}px`);













