export const translasi = (titik_lama, T) => {
  var x_baru = titik_lama.x + T.x;
  var y_baru = titik_lama.y + T.y;

  return { x: x_baru, y: y_baru };
};

export const scale = (titik_lama, S) => {
  var x_baru = titik_lama.x * S.x;
  var y_baru = titik_lama.y * S.y;

  return { x: x_baru, y: y_baru };
};

export const rotate = (titik_lama, sudut) => {
  var x_baru = titik_lama.x * Math.cos(sudut) - titik_lama.y * Math.sin(sudut);
  var y_baru = titik_lama.x * Math.sin(sudut) + titik_lama.y * Math.cos(sudut);

  return { x: x_baru, y: y_baru };
};

export const rotate_fp = (titik_lama, titik_putar, sudut) => {
  var p1 = translasi(titik_lama, { x: -titik_putar.x, y: -titik_putar.y });
  var p2 = rotate(p1, sudut);
  var p3 = translasi(p2, titik_putar);

  return p3;
};

export const scale_fp = (titik_lama, titik_pusat, S) => {
  var p1 = translasi(titik_lama, { x: -titik_pusat.x, y: -titik_pusat.y });
  var p2 = scale(p1, S);
  var p3 = translasi(p2, titik_pusat);

  return p3;
};

export const translasi_array = (array_titik, T) => {
  var array_hasil = [];
  for (var i = 0; i < array_titik.length; i++) {
    var temp = translasi(array_titik[i], T);
    array_hasil.push(temp);
  }
  return array_hasil;
};

export const rotate_array = (array_titik, titik_pusat, sudut) => {
  var array_hasil = [];
  for (var i = 0; i < array_titik.length; i++) {
    var temp = rotate_fp(array_titik[i], titik_pusat, sudut);
    array_hasil.push(temp);
  }
  return array_hasil;
};

export const scale_array = (array_titik, titik_pusat, S) => {
  var array_hasil = [];
  for (var i = 0; i < array_titik.length; i++) {
    var temp = scale_fp(array_titik[i], titik_pusat, S);
    array_hasil.push(temp);
  }
  return array_hasil;
};
