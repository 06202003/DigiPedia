export const gambartitik = (imageDataTemp, x, y, r, g, b) => {
  var index;
  index = 4 * (Math.round(x) + Math.round(y) * 400);

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

export const lingkaranPolar = (imageDataTemp, xc, yc, radius, r, g, b) => {
  for (var theta = 0; theta < Math.PI * 2; theta += 0.001) {
    var x = xc + radius * Math.cos(theta);
    var y = yc + radius * Math.sin(theta);
    gambartitik(imageDataTemp, Math.ceil(x), Math.ceil(y), r, g, b);
  }
};

export const lingkaranKecilJam = (imageDataTemp, xc, yc, radius, r, g, b) => {
  const segiBanyaknya = 12;
  const SudutSegiBanyak = (Math.PI * 2) / segiBanyaknya;

  const now = new Date();
  let currentHour = now.getHours();
  currentHour = currentHour % 12;

  for (var i = 0; i < segiBanyaknya; i++) {
    var theta = i * SudutSegiBanyak;

    var x = xc + radius * Math.cos(theta - Math.PI / 2);
    var y = yc + radius * Math.sin(theta - Math.PI / 2);

    if (i === currentHour) {
      console.log(currentHour, i);
      lingkaranPolar(imageDataTemp, Math.ceil(x), Math.ceil(y), 15, 255, 0, 0);
    } else {
      lingkaranPolar(imageDataTemp, Math.ceil(x), Math.ceil(y), 15, r, g, b);
    }
  }
};

export const lingkaranKecilMenit = (imageDataTemp, xc, yc, radius, r, g, b) => {
  const segiBanyaknya = 12;
  const SudutSegiBanyak = (Math.PI * 2) / segiBanyaknya;

  const now = new Date();
  let currentMinute = now.getMinutes();
  currentMinute = Math.floor(currentMinute / 5);
  console.log(currentMinute);

  for (var i = 0; i < segiBanyaknya; i++) {
    var theta = i * SudutSegiBanyak;

    var x = xc + radius * Math.cos(theta - Math.PI / 2);
    var y = yc + radius * Math.sin(theta - Math.PI / 2);

    if (i === currentMinute) {
      console.log(currentMinute, i);
      lingkaranPolar(imageDataTemp, Math.ceil(x), Math.ceil(y), 15, 0, 255, 0);
    } else {
      lingkaranPolar(imageDataTemp, Math.ceil(x), Math.ceil(y), 15, r, g, b);
    }
  }
};

export const jarumJam = (imageDataTemp, xc, yc, length, angle, r, g, b) => {
  const x2 = xc + length * Math.cos(angle - Math.PI / 2);
  const y2 = yc + length * Math.sin(angle - Math.PI / 2);
  dda_line(imageDataTemp, xc, yc, Math.ceil(x2), Math.ceil(y2), r, g, b);
};

// Fungsi untuk menggambar jarum menit dengan DDA Line
export const jarumMenit = (imageDataTemp, xc, yc, length, angle, r, g, b) => {
  const x2 = xc + length * Math.cos(angle - Math.PI / 2);
  const y2 = yc + length * Math.sin(angle - Math.PI / 2);
  dda_line(imageDataTemp, xc, yc, Math.ceil(x2), Math.ceil(y2), r, g, b);
};
