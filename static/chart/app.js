const padding = 40;
const width = 600;
const height = 200;
const dpiWidth = 2 * width;
const dpiHeight = 2 * height;
const viewHeight = dpiHeight - 2 * padding;
const viewWidth = dpiWidth;
const rows = 5;

chart(document.getElementById("chart"), [
  [0, 0],
  [200, 100],
  [400, 100],
  [600, 200],
  [800, 50],
]);

function chart(canvas, data) {
  const ctx = canvas.getContext("2d");

  canvas.style.width = width + "px";
  canvas.style.height = height + "px";
  canvas.width = dpiWidth;
  canvas.height = dpiHeight;

  const [yMax, yMin] = boundaries(data);

  // ===

  const step = viewHeight / rows;
  const textStep = (yMax - yMin) / rows;

  ctx.beginPath();
  ctx.strokeStyle = "#bbb";
  ctx.font = "normal 20px Roboto";
  ctx.fillStyle = "#96a2aa";

  for (let i = 1; i <= rows; i++) {
    const y = step * i;
    const text = Math.round(yMax - textStep * i);
    ctx.fillText(String(text), 5, y + padding - 10);
    ctx.moveTo(0, y + padding);
    ctx.lineTo(dpiWidth, y + padding);
  }

  ctx.stroke();
  ctx.closePath();

  // ===
  ctx.beginPath();
  // Жирность линии, которой соединяем точки
  ctx.lineWidth = 4;
  // Цвет, которым соединяем точки
  ctx.strokeStyle = "#ff0000";
  for (const [x, y] of data) {
    // Ставим точки
    ctx.lineTo(x, dpiHeight - padding - y);
  }
  // Соединяем все точки
  ctx.stroke();
  ctx.closePath();
}

function boundaries(data) {
  let min;
  let max;

  for (const [, y] of data) {
    if (typeof min !== "number") min = y;
    if (typeof max !== "number") max = y;

    if (min > y) min = y;
    if (max < y) max = y;
  }

  return [min, max];
}
