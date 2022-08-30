// Canvasからbase64エンコーディングされた画像データを取得する
const canvas = document.getElementById("draw_area");
const ctx = canvas.getContext('2d');
const base64 = canvas.toDataURL();

// LocalStroageからデータを取得する
const storageData = window.localStorage.getItem("saveKey");
console.log(storageData);

// Imageオブジェクトを作成し、src属性にデータを設定する
const image = new Image();
image.src = storageData;
console.log(image);
image.onload = function () {

// 画像の読み込みが終わったら、Canvasに画像を反映する。
ctx.drawImage(image, 0, 0);
}

setInterval(saveCanvas, 5000);
function saveCanvas() {
    // console.log(storageData);
    // console.log(5);

    const base64 = canvas.toDataURL();
    // LocalStorageに保存する
    window.localStorage.setItem("saveKey", base64);
    // console.log(window.localStorage.getItem("saveKey"));
}
