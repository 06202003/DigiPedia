export const createIdentity = () => {
  var identitas = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ];
  return identitas;
};

export const multiplyMatrix = (m1, m2) => {
  var hasil = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      for (var k = 0; k < 3; k++) {
        hasil[i][k] += m1[i][j] * m2[j][k];
      }
    }
  }
  return hasil;
};

export const createTranslation = (Tx, Ty) => {
  var translasi = [
    [1, 0, Tx],
    [0, 1, Ty],
    [0, 0, 1],
  ];

  return translasi;
};

export const createScale = (Sx, Sy) => {
  var scale = [
    [Sx, 0, 0],
    [0, Sy, 0],
    [0, 0, 1],
  ];

  return scale;
};

export const createRotation = (theta) => {
  var rotate = [
    [Math.cos(theta), -Math.sin(theta), 0],
    [Math.sin(theta), Math.cos(theta), 0],
    [0, 0, 1],
  ];

  return rotate;
};

export const rotation_fp = (xc, yc, theta) => {
  var m1 = createTranslation(-xc, -yc);
  var m2 = createRotation(theta);
  var m3 = createTranslation(xc, yc);

  var hasil;
  hasil = multiplyMatrix(m3, m2);
  hasil = multiplyMatrix(hasil, m1);

  return hasil;
};

export const scale_fp = (xc, xy, Sx, Sy) => {
  var m1 = createTranslation(-xc, -yc);
  var m2 = createScale(Sx, Sy);
  var m2 = createTranslation(xc, yc);

  var hasil;
  hasil = multiplyMatrix(m3, m2);
  hasil = multiplyMatrix(hasil, m1);

  return hasil;
};

export const transform_titik = (titik_lama, m) => {
  var x_baru = m[0][0] * titik_lama.x + m[0][1] * titik_lama.y + m[0][2] * 1;
  var y_baru = m[1][0] * titik_lama.x + m[1][1] * titik_lama.y + m[1][2] * 1;

  return { x: x_baru, y: y_baru };
};

export const transform_array = (array_titik, m) => {
  var hasil = [];
  for (var i = 0; i < array_titik.length; i++) {
    var titik_hasil;
    titik_hasil = transform_titik(array_titik[i], m);
    hasil.push(titik_hasil);
  }

  return hasil;
};
