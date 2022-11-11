const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const lineWidth = document.querySelector(".line-width");
const color = document.querySelector(".color");
// 클래스네임은 ArrayLike 객체지 배열은 아니다. HTMLCollection으로 준다.
// const colorOptions = document.getElementsByClassName("color-option");

//배열로 만들어주기 위해서
const colorOptions = Array.from(
  document.getElementsByClassName("color-option")
);

const modeBtn = document.querySelector(".mode-btn");
const eraserBtn = document.querySelector(".eraser-btn");
const initBtn = document.querySelector(".init-btn");
const fileInput = document.querySelector(".file");
const textInput = document.querySelector(".text");
const saveBtn = document.querySelector(".save");

canvas.width = 400;
canvas.height = 400;
ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round";

// let moveX = 0;
// let moveY = 0;

// const colors = [
//   "#ff3838",
//   "#ffb8b8",
//   "#c56cf0",
//   "#ff9f1a",
//   "#fff200",
//   "#32ff7e",
//   "#7efff5",
// ];

// function onMouseMove(event) {
//   ctx.beginPath();
//   ctx.moveTo(moveX, moveY);

//   const color = colors[Math.floor(Math.random() * colors.length)];
//   ctx.strokeStyle = color;
//   ctx.lineTo(event.offsetX, event.offsetY);
//   ctx.stroke();
// }

// function onClick(event) {
//   moveX = event.offsetX;
//   moveY = event.offsetY;

//   ctx.moveTo(moveX, moveY);
// }

// canvas.addEventListener("mousemove", onMouseMove);
// canvas.addEventListener("click", onClick);

let isPainting = false;
let isFilling = false;

function onMove(event) {
  if (isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return;
  }
  // ctx.beginPath();
  ctx.moveTo(event.offsetX, event.offsetY);
}

function startPainting() {
  isPainting = true;
}

function cancelPainting() {
  isPainting = false;
  ctx.beginPath();
}

function onLineWidthChange(event) {
  ctx.lineWidth = event.target.value;
}

function onColorChange(event) {
  ctx.strokeStyle = event.target.value;
  ctx.fillStyle = event.target.value;
}

function onClickColor(event) {
  ctx.strokeStyle = event.target.dataset.color;
  ctx.fillStyle = event.target.dataset.color;
  color.value = event.target.dataset.color;
}

function onModeClick() {
  if (isFilling) {
    isFilling = false;
    modeBtn.innerText = "Fill";
  } else {
    isFilling = true;
    modeBtn.innerText = "Draw";
  }
}

function onCanvasClick() {
  if (isFilling) {
    ctx.fillRect(0, 0, 400, 400);
  }
}

function onEraserClick() {
  ctx.strokeStyle = "white";
  isFilling = false;
  modeBtn.innerText = "Fill";
}

function onInitClick() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, 400, 400);
}

function onFileChange(event) {
  const fileDate = event.target.files[0];
  const url = URL.createObjectURL(fileDate);
  const image = new Image();
  image.src = url;
  image.onload = function () {
    ctx.drawImage(image, 0, 0, 400, 400);
    // 선택된 파일 없음이라고 나오기 위해 널값을 줌
    file.value = null;
  };
}

function onDoubleClick(event) {
  const text = textInput.value;
  if (text !== "") {
    ctx.save();
    ctx.lineWidth = 1;
    ctx.font = "48px serif";
    ctx.fillText(text, event.offsetX, event.offsetY);
    // ctx.strokeText(text, event.offsetX, event.offsetY);
    ctx.restore();
  } else {
  }
}

function onSaveClick() {
  const url = canvas.toDataURL();
  const a = document.createElement("a");
  a.href = url;
  a.download = "myDrawing.png";
  a.click();
}

canvas.addEventListener("dblclick", onDoubleClick);
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
// 마우스가 캔버스 클릭한 채로 밖으로 나갔을 때 지속되는 경우
canvas.addEventListener("mouseleave", cancelPainting);
// 다른방법
// document.addEventListener("mouseup", cancelPainting);

canvas.addEventListener("click", onCanvasClick);

lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);

colorOptions.forEach((color) => color.addEventListener("click", onClickColor));

modeBtn.addEventListener("click", onModeClick);
eraserBtn.addEventListener("click", onEraserClick);
initBtn.addEventListener("click", onInitClick);
fileInput.addEventListener("change", onFileChange);
saveBtn.addEventListener("click", onSaveClick);
