export const RGBtoHex = ({r, g, b}) => (
  `#${colorToHex(r)}${colorToHex(g)}${colorToHex(b)}`
);

const colorToHex = (c) => {
  // The radix is 16 for hexidecimal numbers
  const hex = c.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}


export const RGBtoHSV = (rgb) => {
  // Default Value
  for (let key in rgb) {
    const value = rgb[key];
    if (isNaN(value) || value > 255 || value < 0) {
      return { h: 0, s: 0, v: 0 };
    }
  }

  const R = rgb.r/255;
  const G = rgb.g/255;
  const B = rgb.b/255;
  const min = Math.min(R, G, B);
  const max = Math.max(R, G, B);
  const delta_max = max - min;
  let delta_R = 0;
  let delta_G = 0;
  let delta_B = 0;
  let H = 0;
  let S = 0;
  let V = 0;

  // Vibrance / Brightness
  V = max;

  // Hue and Saturation
  if (delta_max === 0) {
    H = 0;
    S = 0;
  } else {
    S = delta_max / max;

    delta_R = ( ((max - R)/6) + (max/2) )/max;
    delta_G = ( ((max - G)/6) + (max/2) )/max;
    delta_B = ( ((max - B)/6) + (max/2) )/max;

    if      (R === max) H = delta_B - delta_G;
    else if (G === max) H = (1/3) + delta_R - delta_B;
    else if (B === max) H = (2/3) + delta_G - delta_R;

    if (H < 0) H += 1;
    if (H > 1) H -= 1;
  }
  
  H = Math.round(H * 360);
  S = Math.round(S * 100);
  V = Math.round(V * 100);

  return { h: H, s: S, v: V };
}


export const HSVtoRGB = ({h, s, v}) => {
  // // Default value
  if (
    h > 360  || s > 100  || v > 100 || 
    h < 0    || s < 0    || v < 0   ||
    isNaN(h) || isNaN(s) || isNaN(v)
  ) return { r: 0, g: 0, b: 0 };

  const H = h / 360; 
  const S = s * 0.01;
  const V = v * 0.01;
  let R = 0;
  let G = 0;
  let B = 0;
  let temp_h = 0;
  let temp_i = 0;
  let temp_1 = 0;
  let temp_2 = 0;
  let temp_3 = 0;

  if (s === 0) {
    R =  Math.round(V * 255);
    G =  Math.round(V * 255);
    B =  Math.round(V * 255);
  } else {
    temp_h = H * 6;
    if (temp_h === 6) temp_h = 0;
    temp_i = Math.floor(temp_h);
    temp_1 = V * (1 - S);
    temp_2 = V * (1 - S * (temp_h - temp_i));
    temp_3 = V * (1 - S * (1 - (temp_h - temp_i)));

    if (temp_i === 0) {
      R = V;
      G = temp_3;
      B = temp_1;
    } else if (temp_i === 1) {
      R = temp_2;
      G = V;
      B = temp_1;
    } else if (temp_i === 2) {
      R = temp_1;
      G = V;
      B = temp_3;
    } else if (temp_i === 3) {
      R = temp_1;
      G = temp_2;
      B = V;
    } else if (temp_i === 4) {
      R = temp_3;
      G = temp_1;
      B = V;
    } else {
      R = V;
      G = temp_1;
      B = temp_2;
    }

    R = Math.round(R * 255);
    G = Math.round(G * 255);
    B = Math.round(B * 255);
  }

  return { r: R, g: G, b: B };
}


export const RGBtoHSL = (rgb) => {
  // Default value
  for (let key in rgb) {
    const value = rgb[key];
    if (isNaN(value) || value > 255 || value < 0) {
      return { h: 0, s: 0, l: 0 };
    }
  }

  const RGB = [rgb.r, rgb.g, rgb.b].map(value => +(value/255).toFixed(2));
  const min = Math.min(RGB[0], RGB[1], RGB[2]);
  const max = Math.max(RGB[0], RGB[1], RGB[2]);
  let H = 0; 
  let S = 0; 
  let L = 0;
  
  // LIGHTNESS
  L = Math.round((min + max)/2 * 100);  // Brightness formula
  
  // SATURATION
  if (max === min) {
    S = 0;
  } else if (RGB[0] === RGB[1] && RGB[1] === RGB[2]) {
    // It's grayscaled when the values are equal. The max, min, r, g, or b value can be used to get the percentage.
    S = max * 100;
  } else {
    // If the lightness is greater than 50%, the saturation is darker and lighter if it's not.
    const bit = L > 0.5 ? 2.0 : 0;
    // Saturation formula
    S = Math.round((max - min)/(bit - min - max) * 100);
  }

  // HUE
  if (S === 0) {
    H = 0;
  } else {
    RGB.forEach((e, i) => {
      if (e === max) {
        // Function expression for offsetting the index. It loops around if it's greater the array length. 
        const index = (offset, j = i+offset) => j > RGB.length-1 ? j-RGB.length : j;
        // Hue formula   (i * 2 is the bit value (0deg, 120deg, or 240deg) (red, green, or blue zone))
        H = (i * 2) + (RGB[index(1)]-RGB[index(2)])/(max-min);
        // Converted to a percentage of 360
        H = Math.round(H.toFixed(2) * 60);
        // When the hue goes back to red it's negative, so 360 must be added.
        H = H < 0 ? H + 360 : H;
      }
    });
  }

  return { h: H, s: S, l: L };
}


export const HSLtoRGB = ({h, s, l}) => {
  // Default value
  if (
    h > 360  || s > 100  || l > 100 || 
    h < 0    || s < 0    || l < 0   ||
    isNaN(h) || isNaN(s) || isNaN(l)
  ) return { r: 0, g: 0, b: 0 };

  // The HSL values are converted to deciamls
  const H = h / 360; 
  const S = s * 0.01;
  const L = l * 0.01;
  let RGB = [0, 0, 0];

  if (S === 0) {
    // If saturation is 0, there is no color. It's a grayscale, so the rgb values are equal.
    RGB = RGB.map(e => L);
  } else {
    // If lightness is less than 50%, use the formula for the darker values else use the formula for the lighter values.
    const temp_2 = L < 0.5 ? (L * (1 + S)) : ((L + S) - (L * S));
    const temp_1 = (2 * L) - temp_2;

    // RGB
    const HuetoRGB = (t1, t2, tH) => {
      tH = (tH < 0) ? (tH + 1) : (tH > 1) ? (tH - 1) : tH;
      if ( (6 * tH) < 1 ) return ( t1 + (t2 - t1) * 6 * tH );
      if ( (2 * tH) < 1 ) return ( t2 );
      if ( (3 * tH) < 2 ) return ( t1 + (t2 - t1) * ((2 / 3) - tH) * 6 );
      return t1;
    }

    RGB[0] = 255 * HuetoRGB(temp_1, temp_2, H + (1/3));
    RGB[1] = 255 * HuetoRGB(temp_1, temp_2, H);
    RGB[2] = 255 * HuetoRGB(temp_1, temp_2, H - (1/3));
    RGB = RGB.map(e => Math.round(e));
  }

  return { r: RGB[0], g: RGB[1], b: RGB[2] };
}


export const RGBtoCMYK = (rgb) => {
  // Default value
  for (let key in rgb) {
    const value = rgb[key];
    if (isNaN(value) || value > 255 || value < 0) {
      return { c: 0, m: 0, y: 0, k: 1 };
    }
  }

  let CMYK = [
    1 - (rgb.r/255),
    1 - (rgb.g/255),
    1 - (rgb.b/255),
    0
  ];
  let temp_K = 1;

  // Find the smallest CMY value
  CMYK.forEach((e,i) => { if (i !== 3) temp_K = e < temp_K ? e : temp_K });

  // CMYK
  if (temp_K === 1) {  // The color is black
    CMYK = CMYK.map((e,i) => i !== 3 ? 0 : e);
  } else {
    // Formula for CMY values
    CMYK = CMYK.map((e,i) => i !== 3 ? +((e - temp_K)/(1 - temp_K)).toFixed(2) : e);
  }
  CMYK[3] = +temp_K.toFixed(2);

  // Converted to percentage
  CMYK = CMYK.map(e => Math.floor(e *= 100));
  
  return { c: CMYK[0], m: CMYK[1], y: CMYK[2], k: CMYK[3] };
}


export const CMYKtoRGB = ({c, m, y, k}) => {
  // Default value
  if (
    c > 100  || m > 100  || y > 100  || k > 100 || 
    c < 0    || m < 0    || y < 0    || k < 0   ||
    isNaN(c) || isNaN(m) || isNaN(y) || isNaN(k)
  ) return { r: 0, g: 0, b: 0 };

  // The CMYK values are converted to decimals
  const C = c * 0.01;
  const M = m * 0.01;
  const Y = y * 0.01;
  const K = k * 0.01;
  let RGB = [C, M, Y];

  // RGB
  // Formula for RGB values
  RGB = RGB.map(e => Math.round(255 * (1 - e) * (1 - K)));
  
  return { r: RGB[0], g: RGB[1], b: RGB[2] };
}


// RGB to CIELab
export const RGBtoLAB =  (rgb) => {
  const XYZ = RGBtoXYZ(rgb);
  return XYZtoLAB(XYZ.x, XYZ.y, XYZ.z);
}

const RGBtoXYZ = (rgb) => {
  // Default value
  for (let key in rgb) {
    const value = rgb[key];
    if (isNaN(value) || value > 255 || value < 0) {
      return { x: 0, y: 0, z: 0 };
    }
  }

  let RGB = [rgb.r/255, rgb.g/255, rgb.b/255];
  let X = 0, Y = 0, Z = 0;

  RGB = RGB
    .map(e => e > 0.04045 ? Math.pow((e + 0.055)/1.055, 2.4) : e/12.92)
    .map(e => e * 100);

  X = RGB[0] * 0.4124 + RGB[1] * 0.3576 + RGB[2] * 0.1805;
  Y = RGB[0] * 0.2126 + RGB[1] * 0.7152 + RGB[2] * 0.0722;
  Z = RGB[0] * 0.0193 + RGB[1] * 0.1192 + RGB[2] * 0.9505;

  return { x: X, y: Y, z: Z };
}

const XYZtoLAB = (X, Y, Z) => {
  // Daylight, sRGB, Adobe-RGB reference values
  let XYZ = [X/95.047, Y/100.000, Z/108.883];
  let L = 0, a = 0, b = 0;

  XYZ = XYZ.map(e => e > 0.008856 ? Math.pow(e, 1/3) : (7.787 * e) + (16 / 116));

  L = Math.round( (116 * XYZ[1]) - 16 );
  a = Math.round( 500 * (XYZ[0] - XYZ[1]) );
  b = Math.round( 200 * (XYZ[1] - XYZ[2]) );

  a = a === -0 ? 0 : a;
  b = b === -0 ? 0 : b;

  return { l: L, a: a, b: b };
}


export const LABtoRGB = ({L, a, b}) => {
  const XYZ = LABtoXYZ(L, a, b);
  return XYZtoRGB(XYZ.x, XYZ.y, XYZ.z);
}

const LABtoXYZ = (L, a, b) => {
  // Default value
  if (
    L > 100 || a > 127  || b > 127  || 
    L < 0   || a < -128 || b < -128 ||
    isNaN(L) || isNaN(a) || isNaN(b)
  ) return { x: 0, y: 0, z: 0 };

  // XYZ
  let Y = (L + 16)/116;
  let X = a/500 + Y;
  let Z = Y - b/200;

  Y = Math.pow(Y, 3) > 0.008856 ? Math.pow(Y, 3) : (Y - 16/116)/7.787;
  X = Math.pow(X, 3) > 0.008856 ? Math.pow(X, 3) : (X - 16/116)/7.787;
  Z = Math.pow(Z, 3) > 0.008856 ? Math.pow(Z, 3) : (Z - 16/116)/7.787;

  // Daylight, sRGB, Adobe-RGB reference values
  X = X * 95.047;
  Y = Y * 100.000;
  Z = Z * 108.883;

  return { x: X, y: Y, z: Z };
}

const XYZtoRGB = (X, Y, Z) => {
  X = X/100;
  Y = Y/100;
  Z = Z/100;

  let RGB = [
    X * 3.2406  + Y * -1.5372 + Z * -0.4986,
    X * -0.9689 + Y * 1.8758  + Z * 0.0415,
    X * 0.0557  + Y * -0.2040 + Z * 1.0570,
  ];

  // RGB  (the values are off by 1 or 2 compared to reference values)
  RGB = RGB
    .map(e => e > 0.0031308 ? (1.055 * Math.pow(e, 1/2.4) - 0.055) : (12.92 * e))
    .map(e => e * 255)
    .map(e => Math.round(e));

  return { r: RGB[0], g: RGB[1], b: RGB[2] };
}