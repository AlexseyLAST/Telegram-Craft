const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth - 30;
canvas.height = window.innerHeight - 10;

const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
let isDragging = false;

let currentShapeIndex;
let startX;
let startY;
let offsetX;
let offsetY;

let getOffset = () => {
    let canvasOffset = canvas.getBoundingClientRect();
    offsetX = canvasOffset.offsetLeft;
    offsetY = canvasOffset.offsetTop;
}

getOffset();
window.onscroll = () => getOffset();
window.onresize = () => getOffset();

canvas.style.border = "5px solid red";

const shapes = [];
shapes.push({ x: 0, y: 0, width: 200, height: 200, color: "red" });
// shapes.push({ x: 0, y: 0, width: 100, height: 100, color: "green" });

const isMouseInShape = (x, y, shape) => {
  const shapeLeft = shape.x;
  const shapeRight = shape.x + shape.width;
  const shapeTop = shape.y;
  const shapeBottom = shape.y + shape.width;

  if (x > shapeLeft && x < shapeRight && y > shapeTop && y < shapeBottom) {
    return true;
  }

  return false;
};

const mouseDown = (event) => {
  event.preventDefault();
  console.log(event);

  startX = parseInt(event.clientX - offsetX);
  startY = parseInt(event.clientY - offsetY);

  let index = 0;
  for (const shape of shapes) {
    if (isMouseInShape(startX, startY, shape)) {
      console.log("yes");
      currentShapeIndex = index;
      isDragging = true;
      return;
    }
    index++;
  }
};

const mouseUp = (event) => {
    if(!isDragging) {
        return;
    }
    event.preventDefault();
    isDragging = false;
}

const mouseOut = (event) => {
    if(!isDragging) {
        return;
    }
    event.preventDefault();
    isDragging = false;
}

const mouseMove = (event) => {
    if(isDragging) {
        return false;
    } else {
        event.preventDefault();
        const mouseX = parseInt(event.clientX - offsetX);
        const mouseY = parseInt(event.clientY - offsetY);

        const dx = mouseX - startX;
        const dy = mouseY - startY;

        const currentShape = shapes[currentShapeIndex];
        console.log(shapes)
        console.log(currentShape)
        currentShape.x += dx;
        currentShape.y += dy;

        drawShapes();

        startX = mouseX;
        startY = mouseY;
    }
}

canvas.onmousedown = mouseDown;
canvas.onmouseup = mouseUp;
canvas.onmouseout = mouseOut;
canvas.onmousemove = mouseMove;

const drawShapes = () => {
  console.log("1");
  context.clearRect(0, 0, canvasWidth, canvasHeight);
  for (const shape of shapes) {
    context.fillStyle = shape.color;
    context.fillRect(shape.x, shape.y, shape.width, shape.height);
  }
};

drawShapes();
