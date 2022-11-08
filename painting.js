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

canvas.width = 800;
canvas.height = 800;
ctx.lineWidth = lineWidth.value;

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
    ctx.fillRect(0, 0, 800, 800);
  }
}

function onEraserClick() {
  ctx.strokeStyle = "white";
  isFilling = false;
  modeBtn.innerText = "Fill";
}

function onInitClick() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, 800, 800);
}

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
