export const gambartitik = (imageDataTemp, x, y, r, g, b) => {
  var index;
  index = 4 * (Math.round(x) + Math.round(y) * 400);

  imageDataTemp.data[index] = r;
  imageDataTemp.data[index + 1] = g;
  imageDataTemp.data[index + 2] = b;
  imageDataTemp.data[index + 3] = 255;
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

// export const lingkaranKecil = (imageDataTemp, xc, yc, radius, r, g, b) => {
//   //(360 derajat / 12 = 30 derajat)
//   const segiBanyaknya = 12;
//   const SudutSegiBanyak = (Math.PI * 2) / segiBanyaknya;
//   console.log(SudutSegiBanyak);

//   for (var i = 0; i < segiBanyaknya; i++) {
//     var theta = i * SudutSegiBanyak;
//     var x = xc + radius * Math.cos(theta);
//     var y = yc + radius * Math.sin(theta);
//     if ((theta = SudutSegiBanyak)) {
//       lingkaranPolar(imageDataTemp, Math.ceil(x), Math.ceil(y), 15, r, g, b);
//     } else {
//       lingkaranPolar(imageDataTemp, Math.ceil(x), Math.ceil(y), 15, r, g, b);
//     }
//   }
// };

export const lingkaranKecil = (imageDataTemp, xc, yc, radius, r, g, b) => {
  const segiBanyaknya = 12;
  const SudutSegiBanyak = (Math.PI * 2) / segiBanyaknya;

  // Get the current time
  const now = new Date();
  const hour = now.getHours() % 12; // Use % 12 to get 0-11 hours
  const minute = now.getMinutes();

  console.log(hour, minute);

  for (var i = 0; i < segiBanyaknya; i++) {
    var theta = i * SudutSegiBanyak;
    var x = xc + radius * Math.cos(theta);
    var y = yc + radius * Math.sin(theta);
    if (i === hour) {
      lingkaranPolar(imageDataTemp, Math.ceil(x), Math.ceil(y), 15, 0, 255, 0);
    } else if (i === Math.floor(minute / 5)) {
      lingkaranPolar(imageDataTemp, Math.ceil(x), Math.ceil(y), 15, 255, 0, 0);
    } else {
      lingkaranPolar(imageDataTemp, Math.ceil(x), Math.ceil(y), 15, r, g, b);
    }
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
  for (var theta = 0; theta < Math.PI * 12; theta += 0.001) {
    radius = 5 * theta;
    var x = xc + radius * Math.cos(theta);
    var y = yc + radius * Math.sin(theta);
    gambartitik(imageDataTemp, Math.ceil(x), Math.ceil(y), r, g, b);
  }
};
