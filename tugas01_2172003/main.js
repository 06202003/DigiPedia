export function gambartitik(imageDataTemp, x, y, r, g, b) {
  var index;
  index = 4 * (x + y * 800);
  imageDataTemp.data[index] = r;
  imageDataTemp.data[index + 1] = g;
  imageDataTemp.data[index + 2] = b;
  imageDataTemp.data[index + 3] = 255;
}

export const dda_line = (imageData, x1, y1, x2, y2, r, g, b) => {
  let dx = x2 - x1;
  let dy = y2 - y1;

  if (Math.abs(dx) > Math.abs(dy)) {
    if (x2 > x1) {
      let y = y1;
      for (let x = x1; x < x2; x++) {
        y = y + dy / Math.abs(dx);
        gambartitik(imageData, x, y, r, g, b);
      }
    } else {
      let y = y1;
      for (let x = x1; x > x2; x--) {
        y = y + dy / Math.abs(dx);
        gambartitik(imageData, x, y, r, g, b);
      }
    }
  } else {
    if (y2 > y1) {
      let x = x1;
      for (let y = y1; y < y2; y++) {
        x = x + dx / Math.abs(dy);
        gambartitik(imageData, x, y, r, g, b);
      }
    } else {
      let x = x1;
      for (let y = y1; y > y2; y--) {
        x = x + dx / Math.abs(dy);
        gambartitik(imageData, x, y, r, g, b);
      }
    }
  }
};

export const dashed = (imageData, x1, y, x2, r, g, b, dashLength, gapLength) => {
  let startX = Math.min(x1, x2);
  let endX = Math.max(x1, x2);

  for (let x = startX; x < endX; x += dashLength + gapLength) {
    let endDashX = Math.min(x + dashLength, endX);
    dda_line(imageData, x, y, endDashX, y, r, g, b);
    x += dashLength + gapLength;
  }
};

export const dotted_line = (imageData, x1, y1, x2, y2, r, g, b, dotInterval) => {
  let dx = x2 - x1;
  let dy = y2 - y1;
  let distance = Math.sqrt(dx * dx + dy * dy);
  let dotX = (dx / distance) * dotInterval;
  let dotY = (dy / distance) * dotInterval;

  for (let i = 0; i < distance; i += dotInterval * 2) {
    let x = x1 + i * (dx / distance);
    let y = y1 + i * (dy / distance);
    gambartitik(imageData, x, y, r, g, b);
  }
};
