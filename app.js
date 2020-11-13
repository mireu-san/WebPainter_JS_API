const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveButton = document.getElementsById("jsSave");

const INITIAL_COLOUR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

ctx.fillStyle = INITIAL_COLOUR;
ctx.strokeStyle = INITIAL_COLOUR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false; /* default will be false. 그래야 그리기 시작부터 filling 을 안하니까! 즉, deactivation 상태. */

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
if (!painting) { /* creating path in (just moving a mouse) */
    ctx.beginPath();
    ctx.moveTo(x, y);
}   else { /*drawing line in (pressing left mouse button) */
    ctx.lineTo(x, y);
    ctx.stroke();
}
}

function handleColourClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event){
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick(){
    if(filling === true){
        filling = false;
        mode.innerText = "Fill"
    } else {
        filling = true;
        mode.innerText = "Paint" /* 그러니까, Fill 버튼을 왼쪽클릭 하면, Paint 로 변경되게끔 하는 것. (이러면 지금 Fill 을 선택했다는 걸 알 수 있음.) */
        
    }
}

function handleCanvasClick() {
    if (filling){
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

function handleCM(event){
    event.preventDefault();
}

function handleSaveClick(){
    const image = canvas.toDataUrl(); /* to let it generate jpeg file, then use "image/jpeg". Otherwise, it will be png. */
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS[EXPORT]";
    link.click();

}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach(potato =>
    potato.addEventListener("click", handleColourClick));

if(range){
    range.addEventListener("input", handleRangeChange);
}

if(mode){
    mode.addEventListener("click", handleModeClick);
}

if(saveButton){
    mode.addEventListener("click", handleSaveClick);
}