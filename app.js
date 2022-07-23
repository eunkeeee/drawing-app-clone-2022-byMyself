const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const modeBtn = document.querySelector("#mode-btn");
const eraser = document.querySelector("#eraser");
const deleteAll = document.querySelector("#delete-all");

const lineWidth = document.querySelector("#line-width");
const color = document.querySelector("#color");
const colorOptions = Array.from(document.querySelectorAll(".color-option"));

canvas.width = 800;
canvas.height = 800;

ctx.lineWidth = lineWidth.value; // 초기값 설정 (html에서 지정한 5)
let isPainting = false;

// 0: 그리기 / 1: 색칠하기 / 2: 전체 채우기
modeBtn.innerText = "그리기";
let modeNumber = 0;

function onMouseMove(event) {
  if (isPainting) {
    // 마우스가 지나간 x,y 좌표: event.offsetX/Y로 가져올 수 있음
    ctx.lineTo(event.offsetX, event.offsetY);
    if (modeNumber === 0) {
      ctx.stroke();
    } else if (modeNumber === 1) {
      ctx.fill();
    } else {
      ctx.fillRect(0, 0, 800, 800);
    }
    return;
  }
  ctx.moveTo(event.offsetX, event.offsetY);
}
function changeMode() {
  if (modeNumber === 0) {
    modeNumber = 1;
    modeBtn.innerText = "채우기";
  } else if (modeNumber === 1) {
    modeNumber = 2;
    modeBtn.innerText = "전체 채우기";
  } else {
    modeNumber = 0;
    modeBtn.innerText = "그리기";
  }
}

function onColorChange(event) {
  changeStyles(event.target.value);
}
function onColorChoose(event) {
  const chosenColor = event.target.dataset.color;
  changeStyles(chosenColor);
  color.value = chosenColor; // 고른 컬러에 대한 피드백 제공
}
function changeStyles(style) {
  ctx.fillStyle = style;
  ctx.strokeStyle = style;
}

function startPainting() {
  isPainting = true;
}
function quitPainting() {
  isPainting = false;
  ctx.beginPath();
}
function onLineWidthChange(event) {
  ctx.lineWidth = event.target.value;
}
function selectEraser() {
  changeStyles("white");
  modeNumber = 0;
  modeBtn.innerText = "그리기";
}
function selectDeleteAll() {
  result = confirm("Are you sure to Delete All?");
  if (result) {
    changeStyles("white");
    ctx.fillRect(0, 0, 800, 800);
  }
}

canvas.addEventListener("mousemove", onMouseMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", quitPainting);
canvas.addEventListener("mouseleave", quitPainting); // 오류 방지
modeBtn.addEventListener("click", changeMode);
eraser.addEventListener("click", selectEraser);
deleteAll.addEventListener("click", selectDeleteAll);

lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);
colorOptions.forEach((element) =>
  element.addEventListener("click", onColorChoose)
);
