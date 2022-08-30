"use strict";
import { judge } from './main.js';
export class Element {
    elements = document.getElementsByClassName("playerElem");
    container = document.querySelector(".container");
    setting = document.querySelector(".setting");
    change = document.getElementById("change");

    // dragMouse;
    pageX;
    pageY;
    mouseDownX;
    mouseDownY;
    mouseMoveX;
    mouseMoveY;
    x;
    y;
    elemId;

    moveElement() {
        this.container.addEventListener('mouseup', this.listener, false);
        this.container.addEventListener("touchend", this.mobileleave, false);
        this.container.addEventListener('click', this.listener, false);
        this.dragElement();
    }
    listener = (event) => {
        console.log(event.type + "：起動");
        switch (event.type) {
            case 'mousedown':
                // console.log(event.target)
                this.lastMousedownElement = event.target.id;
                let elem = event.target;
                elem.classList.add("drag");

                //タッチデイベントとマウスのイベントの差異を吸収
                if (event.type !== "mousedown") {
                    var event = event.changedTouches[0];
                }
                // 要素がクリックされた座標を取得する変数(varでないと動作しない/switchのブロックスコープ)
                var x;
                var y;
                //要素内の相対座標を取得
                this.x = event.pageX - elem.offsetLeft;
                this.y = event.pageY - elem.offsetTop;
                // this.mmove().bind(this);
                document.body.addEventListener("mousemove", this.mmove.bind(this), false);
                // this.dragMouse = true;


                console.log(event.pageX);
                this.mouseDownX = event.pageX;
                this.mouseDownY = event.pageY;
                this.mouseMoveX = event.pageX;
                this.mouseMoveY = event.pageY;
                // console.log("実行されておる");
                break;

            case 'mouseup':
                console.log("mouseup実行");
                this.lastMouseupElement = event.target.id;
                let mouseup_elem = event.target;
                console.log(mouseup_elem);
                this.elemid = event.target.getAttribute("data-elemid");
                console.log(this.elemid);
                mouseup_elem.classList.remove("drag");
                break;

            case 'click':
                console.log("clickイベント起動");
                this.pageX = event.pageX;
                this.pageY = event.pageY;

                const test = event.target;
                console.log(this.mouseDownX);
                console.log(this.mouseMoveX);
                // 座標が同じ,イベント発火が要素上,ボール以外で設定画面を表示
                if (this.mouseDownX === this.mouseMoveX && this.mouseDownY === this.mouseMoveY && test && this.mouseDownX) {
                    // alert("位置が動いていません");
                    console.log(event.target.textContent)
                    const name = event.target.textContent;
                    console.log(event.target.style.backgroundColor)
                    const color = event.target.style.backgroundColor;
                    const target = event.target;

                    // this.changeElement(event.target.id, name, color);
                    this.changeElement(target);
                }
                if (this.lastMousedownElement === this.lastMouseupElement || judge === true) return;

                this.setElement();
                break;
        }
    }

    mmove(event) {
        const drag = document.getElementsByClassName("drag")[0];
        // console.log(event);
        if (event.type !== "mousemove") {
            var event = event.changedTouches[0];
        }
        event.preventDefault();
        if (drag) {
            drag.style.top = event.pageY - this.y + "px";
            drag.style.left = event.pageX - this.x + "px";
            this.dragMouse = true;
        }
        this.mouseMoveX = event.pageX;
        this.mouseMoveY = event.pageY;
    }

    dragElement() {
        const hoge = document.getElementsByClassName("playerElem");
        for (let dragElm of hoge) {
            dragElm.addEventListener('mousedown', this.listener.bind(this), false);
            dragElm.addEventListener('touchstart', this.mobile_start.bind(this), false);
            this.container.addEventListener('mouseup', this.listener, false);
            this.container.addEventListener('touchend', this.mobileleave, false);
        }
    }

    setElement(event) {
        const back = document.getElementById("back");
        const add = document.getElementById("add");
        this.setting.style.display = "flex";
        back.addEventListener("click", this.backSetElement);
        add.addEventListener("click", this.addListener);
    }
    backSetElement = () => {
        this.setting.style.display = "none";
        const error = document.querySelector(".error");
        error.classList.remove("err-active");
    }
    addListener = (event) => {
        const formName = document.forms[0].name.value;
        const formColor = document.forms[0].radio.value;
        console.log(formName.length);
        if (formName.length > 6) {
            const error = document.querySelector(".error");
            error.classList.add("err-active");
        } else {
            this.setting.style.display = "none";
            this.addElement(formName, formColor);
        }
    }

    changeElement(target) {
        const cancel = document.getElementById("cancel");
        const update = document.getElementById("update");
        // this.elements.id;
        console.log(target);
        const targetElem = target;
        console.log(targetElem);
        this.change.style.display = "flex";
        document.forms[1].name.value = target.textContent;
        console.log(target.style.backgroundColor);
        console.log(document.forms[1].radio.value);
        document.forms[1].radio.value = target.style.backgroundColor;

        cancel.addEventListener("click", this.backChangeElement);
        update.addEventListener("click", () => {
            const name = document.forms[1].name.value;
            const color = document.forms[1].radio.value;

            // ターゲットとなる要素を取得
            console.log(this.name);
            targetElem.textContent = name;
            targetElem.style.backgroundColor = color;
            this.backChangeElement();
        });
    }
    backChangeElement = () => {
        this.change.style.display = "none";
    }

    changeListener = (event) => {
        const target = event.target;
        const formName = document.forms[0].name.value;
        const formColor = document.forms[0].radio.value;

        console.log(target);
        console.log(target.textContent);
    }

    addElement(name, color) {
        // 追加する要素を定義
        const playerElem = document.createElement("div");
        playerElem.className = "playerElem";
        const text = document.createTextNode(name);
        playerElem.setAttribute("id", "player");
        playerElem.appendChild(text);
        playerElem.style.backgroundColor = color;
        this.container.appendChild(playerElem);

        // クリックした座標位置に要素を配置
        const drag = document.querySelectorAll(".playerElem");
        const elemId = drag.length - 1;
        drag[elemId].setAttribute("data-elemId", elemId);

        // 下記の20はマジックナンバーなので、他に算出方法あるかも
        drag[elemId].style.top = this.pageY - 20 + "px";
        drag[elemId].style.left = this.pageX - 20 + "px";
        this.dragElement();
    }

    // スマホ用
    mobile_start = (event) => {
        console.log(event.target)
        this.lastMousedownElement = event.target.id;
        let elem2 = event.target;
        elem2.classList.add("drag");

        //タッチデイベントとマウスのイベントの差異を吸収
        if (event.type !== "mousedown") {
            var event = event.changedTouches[0];
        }
        // 要素がクリックされた座標を取得する変数(varでないと動作しない/switchのブロックスコープ)
        var x;
        var y;
        //要素内の相対座標を取得
        this.x = event.pageX - elem2.offsetLeft;
        this.y = event.pageY - elem2.offsetTop;
        // this.mmove().bind(this);
        document.body.addEventListener("touchmove", this.mobilemove.bind(this), false);
        // this.dragMouse = true;


        console.log(event.pageX);
        this.mouseDownX = event.pageX;
        this.mouseDownY = event.pageY;
        this.mouseMoveX = event.pageX;
        this.mouseMoveY = event.pageY;
        // console.log("実行されておる");
    }

    mobilemove(event) {
        const drag = document.getElementsByClassName("drag")[0];
        console.log(event);
        if (event.type !== "mousemove") {
            var event = event.changedTouches[0];
        }
        // event.preventDefault();
        if (drag) {
            drag.style.top = event.pageY - this.y + "px";
            drag.style.left = event.pageX - this.x + "px";
            this.dragMouse = true;
        }
        this.mouseMoveX = event.pageX;
        this.mouseMoveY = event.pageY;
    }
    mobileleave(event) {
        console.log("end実行");
        this.lastMouseupElement = event.target.id;
        let mouseup_elem2 = event.target;
        console.log(mouseup_elem2);
        this.elemid = event.target.getAttribute("data-elemid");
        console.log(this.elemid);
        mouseup_elem2.classList.remove("drag");
    }
}