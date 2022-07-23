const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const strokeOrFillBtn = document.querySelector("#stroke-or-fill");
const modeBtn = document.querySelector("#mode-btn");
const lineWidth = document.querySelector("#line-width");
const color = document.querySelector("#color");
const colorOptions = Array.from(document.querySelectorAll(".color-option"));

canvas.width = 800;
canvas.height = 800;

ctx.lineWidth = lineWidth.value; // 초기값 설정 (html에서 지정한 5)
let isPainting = false;

strokeOrFillBtn.innerText = "Draw Line";
let isStroke = true;

modeBtn.innerText = "그리기";
let modeDefaultStroke = true;

function changeStyles(style) {
  ctx.fillStyle = style;
  ctx.strokeStyle = style;
}
function onColorChange(event) {
  changeStyles(event.target.value);
}
function onColorChoose(event) {
  const chosenColor = event.target.dataset.color;
  changeStyles(chosenColor);
  color.value = chosenColor; // 고른 컬러에 대한 피드백 제공
}
function onMouseMove(event) {
  if (isPainting) {
    // 마우스가 지나간 x,y 좌표: event.offsetX/Y로 가져올 수 있음
    ctx.lineTo(event.offsetX, event.offsetY);
    if (isStroke) {
      ctx.stroke();
    } else {
      ctx.fill();
    }
    return;
  }
  ctx.moveTo(event.offsetX, event.offsetY);
}
function startPainting() {
  isPainting = true;
}
function quitPainting() {
  isPainting = false;
  ctx.beginPath();
}
function StrokeFillChange() {
  if (isStroke) {
    isStroke = false;
    strokeOrFillBtn.innerText = "Draw Line";
  } else {
    isStroke = true;
    strokeOrFillBtn.innerText = "Draw Surface";
  }
}
function onLineWidthChange(event) {
  ctx.lineWidth = event.target.value;
}
function changeMode() {
  if (modeDefaultStroke) {
    modeDefaultStroke = false;
    modeBtn.innerText = "채우기";
  } else {
    modeDefaultStroke = true;
    modeBtn.innerText = "그리기";
  }
}

canvas.addEventListener("mousemove", onMouseMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", quitPainting);
canvas.addEventListener("mouseleave", quitPainting); // 오류 방지
strokeOrFillBtn.addEventListener("click", StrokeFillChange);
lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);
colorOptions.forEach((element) =>
  element.addEventListener("click", onColorChoose)
);
modeBtn.addEventListener("click", changeMode);
