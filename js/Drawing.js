"use strict";
import { judge } from './main.js';

export class Drawing {

    canvas = document.getElementById("draw_area");
    context = this.canvas.getContext("2d");

    // this減らしてもっと簡潔に書けないだろうか？
    drawPen() {
        this.canvas.addEventListener("mousemove", event => draw(event.layerX, event.layerY));
        this.canvas.addEventListener("touchmove", event => draw(event.layerX, event.layerY));
        //パソコンでクリックしてる間だけ描けるようにした機能
        this.canvas.addEventListener("mousedown", () => {
            this.context.beginPath();
            isDrag = true;
        });
        this.canvas.addEventListener("mouseup", () => {
            this.context.closePath();
            isDrag = false;
        });
        //スマホで描けるようにする機能
        this.canvas.addEventListener("touchstart", () => {
            this.context.beginPath();
            isDrag = true;
        });
        this.canvas.addEventListener("touchend", () => {
            this.context.closePath();
            isDrag = false;
        });

        let isDrag = false;
        //線をかく機能
        const draw = (x, y) => {
            if (!isDrag) return;
            if (judge === false) return;
            this.context.lineTo(x, y);
            this.context.stroke();
        }
    }

    // ペンの色を変えるメソッド
    changePenColor() {
        const selectList = document.querySelectorAll(".select_color > ul > li");
        const colorList = ["black", "red", "blue", "white"];
        for (let i = 0, len = selectList.length; i < len; i++) {
            selectList[i].addEventListener("click", () => {
                console.log(selectList[i]);
                for(let j = 0, len = selectList.length; j < len; j++) {
                    selectList[j].classList.remove("active");
                }
                const color = selectList[i].getAttribute("data-color");
                // 下記はもっと簡潔に書く方法はないか…？
                if (color === "black") {
                    this.context.globalCompositeOperation = "source-over";
                    this.context.strokeStyle = "black";
                    this.context.lineWidth =2;
                    selectList[i].classList.add("active");
                } else if (color === "red") {
                    this.context.globalCompositeOperation = "source-over";
                    this.context.strokeStyle = "red";
                    this.context.lineWidth =2;
                    selectList[i].classList.add("active");
                } else if (color === "blue") {
                    this.context.globalCompositeOperation = "source-over";
                    this.context.strokeStyle = "blue";
                    this.context.lineWidth =2;
                    selectList[i].classList.add("active");
                } else {
                    this.context.globalCompositeOperation = 'destination-out';
                    this.context.lineWidth =50;
                    selectList[i].classList.add("active");
                }
            })
        }
    }

    // canvasのサイズをmain要素に合わせるメソッド
    setCanvasSize() {
        const main = document.querySelector("main");
        const mainWidth = main.clientWidth;
        const mainHeight = main.clientHeight;
        this.canvas.setAttribute("width", mainWidth);
        this.canvas.setAttribute("height", mainHeight);
    }
}