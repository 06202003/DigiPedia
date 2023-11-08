export const gambartitik = (imageDataTemp, x, y, r, g, b) => {
  var index;
  index = 4 * (Math.round(x) + Math.round(y) * 500);

  imageDataTemp.data[index] = r;
  imageDataTemp.data[index + 1] = g;
  imageDataTemp.data[index + 2] = b;
  imageDataTemp.data[index + 3] = 255;
};

export const dda_line = (imageData, x1, y1, x2, y2, r, g, b) => {
  let dx = x2 - x1;
  let dy = y2 - y1;
  console.log(dx, dy);

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

export const gambarlingkaran = (imageDataTemp, xc, yc, radius, r, g, b) => {
  //  jalan dari xc - radius sampai xc + radius

  for (var x = xc - radius; x < xc + radius; x++) {
    var y = yc + Math.sqrt(Math.pow(radius, 2) - Math.pow(x - xc, 2));
    gambartitik(imageDataTemp, Math.ceil(x), Math.ceil(y), r, g, b);

    var y = yc - Math.sqrt(Math.pow(radius, 2) - Math.pow(x - xc, 2));
    gambartitik(imageDataTemp, Math.ceil(x), Math.ceil(y), r, g, b);
  }
  for (var x = xc - radius; x < xc + radius; x++) {
    var y = yc + Math.sqrt(Math.pow(radius, 2) - Math.pow(x - xc, 2));
    gambartitik(imageDataTemp, Math.ceil(y), Math.ceil(x), r, g, b);

    var y = yc - Math.sqrt(Math.pow(radius, 2) - Math.pow(x - xc, 2));
    gambartitik(imageDataTemp, Math.ceil(y), Math.ceil(x), r, g, b);
  }
};

export const lingkaranPolar = (imageDataTemp, xc, yc, radius, r, g, b) => {
  let x = radius;
  let y = 0;
  let err = 0;

  while (x >= y) {
    gambartitik(imageDataTemp, xc + x, yc + y, r, g, b);
    gambartitik(imageDataTemp, xc + y, yc + x, r, g, b);
    gambartitik(imageDataTemp, xc - y, yc + x, r, g, b);
    gambartitik(imageDataTemp, xc - x, yc + y, r, g, b);
    gambartitik(imageDataTemp, xc - x, yc - y, r, g, b);
    gambartitik(imageDataTemp, xc - y, yc - x, r, g, b);
    gambartitik(imageDataTemp, xc + y, yc - x, r, g, b);
    gambartitik(imageDataTemp, xc + x, yc - y, r, g, b);

    if (err <= 0) {
      y++;
      err += 2 * y + 1;
    }

    if (err > 0) {
      x--;
      err -= 2 * x + 1;
    }
  }
};

export const lingkaranKecil = (imageDataTemp, xc, yc, radius, r, g, b) => {
  const segiBanyaknya = 4;
  const SudutSegiBanyak = (Math.PI * 2) / segiBanyaknya;

  for (var i = 0; i < segiBanyaknya; i++) {
    var theta = i * SudutSegiBanyak + Math.PI / 4;
    var x = xc + radius * Math.cos(theta);
    var y = yc + radius * Math.sin(theta);
    lingkaranPolar(imageDataTemp, Math.ceil(x), Math.ceil(y), 40, r, g, b);
  }
};

export const ellipsePolar = (imageDataTemp, xc, yc, radiusX, radiusY, r, g, b) => {
  for (var theta = 0; theta < Math.PI * 2; theta += 0.001) {
    var x = xc + radiusX * Math.cos(theta);
    var y = yc + radiusY * Math.sin(theta);
    gambartitik(imageDataTemp, Math.ceil(x), Math.ceil(y), r, g, b);
  }
};

export const obatNyamuk = (imageDataTemp, xc, yc, radius, r, g, b) => {
  for (var theta = 0; theta < Math.PI * 9; theta += 0.001) {
    radius = 5 * theta;
    var x = xc + radius * Math.cos(theta);
    var y = yc + radius * Math.sin(theta);
    gambartitik(imageDataTemp, Math.ceil(x), Math.ceil(y), r, g, b);
  }
};

export const bunga = (imageDataTemp, xc, yc, radius, n, r, g, b) => {
  for (var theta = 0; theta < Math.PI * 2; theta += 0.001) {
    var x = xc + radius * Math.cos(theta) * Math.cos(n * theta);
    var y = yc + radius * Math.sin(theta) * Math.cos(n * theta);
    gambartitik(imageDataTemp, Math.ceil(x), Math.ceil(y), r, g, b);
  }
};

export const polygon = (imageData, point_array, r, g, b) => {
  var point = point_array[0];

  for (var i = 1; i < point_array.length; i++) {
    var point_2 = point_array[i];
    dda_line(imageData, point.x, point.y, point_2.x, point_2.y, r, g, b);
    point = point_2;
  }
  dda_line(imageData, point.x, point.y, point_array[0].x, point_array[0].y, r, g, b);
};

export const floodFillStack = (imageData, canvas, x0, y0, toFlood, color) => {
  var tumpukan = [];
  tumpukan.push({ x: x0, y: y0 });

  while (tumpukan.length > 0) {
    var titik_sekarang = tumpukan.pop();
    var index_sekarang = 4 * (Math.round(titik_sekarang.x) + Math.round(titik_sekarang.y) * canvas.width);

    var r1 = imageData.data[index_sekarang];
    var g1 = imageData.data[index_sekarang + 1];
    var b1 = imageData.data[index_sekarang + 2];

    if (Math.abs(r1 - toFlood.r) <= 5 && Math.abs(g1 - toFlood.g) <= 5 && Math.abs(b1 - toFlood.b) <= 5) {
      imageData.data[index_sekarang] = color.r;
      imageData.data[index_sekarang + 1] = color.g;
      imageData.data[index_sekarang + 2] = color.b;
      imageData.data[index_sekarang + 3] = 255;

      tumpukan.push({ x: titik_sekarang.x + 1, y: titik_sekarang.y });
      tumpukan.push({ x: titik_sekarang.x - 1, y: titik_sekarang.y });
      tumpukan.push({ x: titik_sekarang.x, y: titik_sekarang.y + 1 });
      tumpukan.push({ x: titik_sekarang.x, y: titik_sekarang.y - 1 });
    }
  }
};
