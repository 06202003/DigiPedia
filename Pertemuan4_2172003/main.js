export const gambartitik = (imageDataTemp, x, y, r, g, b) => {
  var index;
  index = 4 * (Math.round(x) + Math.round(y) * 600);

  imageDataTemp.data[index] = r;
  imageDataTemp.data[index + 1] = g;
  imageDataTemp.data[index + 2] = b;
  imageDataTemp.data[index + 3] = 255;
};

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

export const polyline = (imageData, point_array, r, g, b) => {
  var point = point_array[0];

  dda_line(imageData, point.x, point.y, 150, 100, 255, 0, 0);

  for (var i = 1; i < point_array.length; i++) {
    var point_2 = point_array[i];
    dda_line(imageData, point.x, point.y, point_2.x, point_2.y, r, g, b);
    point = point_2;
  }
};

export const polygon = (imageData, point_array, r, g, b) => {
  var point = point_array[0];
  console.log(point);

  for (var i = 1; i < point_array.length; i++) {
    var point_2 = point_array[i];
    console.log('point2', point_2);
    dda_line(imageData, point.x, point.y, point_2.x, point_2.y, r, g, b);
    point = point_2;
  }
  dda_line(imageData, point.x, point.y, point_array[0].x, point_array[0].y, r, g, b);
};

export const lingkaranPolar = (imageDataTemp, xc, yc, radius, r, g, b) => {
  for (var theta = 0; theta < Math.PI * 2; theta += 0.001) {
    var x = xc + radius * Math.cos(theta);
    var y = yc + radius * Math.sin(theta);
    gambartitik(imageDataTemp, Math.ceil(x), Math.ceil(y), r, g, b);
  }
};

export const ellipsePolar = (imageDataTemp, xc, yc, radiusX, radiusY, r, g, b) => {
  for (var theta = 0; theta < Math.PI * 2; theta += 0.001) {
    var x = xc + radiusX * Math.cos(theta);
    var y = yc + radiusY * Math.sin(theta);
    gambartitik(imageDataTemp, Math.ceil(x), Math.ceil(y), r, g, b);
  }
};

export const gambarlingkaran = (imageDataTemp, xc, yc, radius, r, g, b) => {
  //  jalan dari xc - radius sampai xc + radius

  for (var x = xc - radius; x < xc + radius; x++) {
    var y = yc + Math.sqrt(Math.pow(radius, 2) - Math.pow(x - xc, 2));
    gambartitik(imageDataTemp, Math.ceil(x), Math.ceil(y), r, g, b);
    console.log(x, y);

    var y = yc - Math.sqrt(Math.pow(radius, 2) - Math.pow(x - xc, 2));
    gambartitik(imageDataTemp, Math.ceil(x), Math.ceil(y), r, g, b);
    console.log(x, y);
  }
  for (var x = xc - radius; x < xc + radius; x++) {
    var y = yc + Math.sqrt(Math.pow(radius, 2) - Math.pow(x - xc, 2));
    gambartitik(imageDataTemp, Math.ceil(y), Math.ceil(x), r, g, b);
    console.log(x, y);

    var y = yc - Math.sqrt(Math.pow(radius, 2) - Math.pow(x - xc, 2));
    gambartitik(imageDataTemp, Math.ceil(y), Math.ceil(x), r, g, b);
    console.log(x, y);
  }
};

export const floodFillNaive = (imageData, canvas, x, y, toFlood, color) => {
  var index = 4 * (Math.round(x) + Math.round(y) * canvas.width);
  var r1 = imageData.data[index];
  var g1 = imageData.data[index + 1];
  var b1 = imageData.data[index + 2];

  if (r1 == toFlood.r && g1 == toFlood.g && b1 == toFlood.b) {
    imageData.data[index] = color.r;
    imageData.data[index + 1] = color.g;
    imageData.data[index + 2] = color.b;
    imageData.data[index + 3] = 255;

    floodFillNaive(imageData, canvas, x + 1, y, toFlood, color);
    floodFillNaive(imageData, canvas, x, y + 1, toFlood, color);
    floodFillNaive(imageData, canvas, x - 1, y, toFlood, color);
    floodFillNaive(imageData, canvas, x, y - 1, toFlood, color);
  }
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

    if (r1 == toFlood.r && g1 == toFlood.g && b1 == toFlood.b) {
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

export const gambarTitikRandom = (imageData, rect, numPoints) => {
  const { x: x1, y: y1 } = rect[0];
  const { x: x2, y: y2 } = rect[2];

  for (let i = 0; i < numPoints; i++) {
    const x = Math.floor(Math.random() * (x2 - x1)) + x1;
    const y = Math.floor(Math.random() * (y2 - y1)) + y1;

    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    gambartitik(imageData, x, y, r, g, b);
  }
};
