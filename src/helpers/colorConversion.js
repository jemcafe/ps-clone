export const RGBtoHex = (r, g, b) => (
  `#${colorToHex(r)}${colorToHex(g)}${colorToHex(b)}`
);


const colorToHex = (c) => {
  // The radix is 16 for hexidecimal numbers
  const hex = c.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}


export const RGBtoHSL = (r, g, b) => {
  // If the parameter values are out of range or not numbers, the default is returned.
  if (r > 255  || g > 255  || b > 255 || 
      r < 0    || g < 0    || b < 0   ||
      isNaN(r) || isNaN(g) || isNaN(b)
  ) return { h: 0, s: 0, l: 0 };

  const RGB = [r, g, b];
  let min = 255, max = 0;
  let H = 0; 
  let S = 0; 
  let L = 0;

  // The rgb values are converted from 8-bit color values to decimals, and the smallest and largest values are found.
  for (let i = 0; i < RGB.length; i++) {
    RGB[i] = +(RGB[i]/255).toFixed(2);
    max = RGB[i] > max ? RGB[i] : max;
    min = RGB[i] < min ? RGB[i] : min;
  }
  
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
    S = Math.round((max-min)/(bit-min-max) * 100);
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


export const HSLtoRGB = (h, s, l) => {
  // If the parameter values are out of range or not numbers, the default is returned.
  if (h > 360  || s > 100  || l > 100 || 
      h < 0    || s < 0    || l < 0   ||
      isNaN(h) || isNaN(s) || isNaN(l)
  ) return { r: 0, g: 0, b: 0 };

  // The HSL values are converted to deciamls
  const H = +(h / 360).toFixed(3); 
  const S = s * 0.01;
  const L = l * 0.01;
  let RGB = [0, 0, 0];

  if (S === 0) {
    // If saturation is 0, there is no color. It's a grayscale, so the rgb values are equal.
    RGB = RGB.map(e => Math.round(L * 0.01 * 255));
  } else {
    // If lightness is less than 50%, use the formula for the darker values else use the formula for the lighter values.
    const temp_1 = L < 0.5 ? (L * (1.0 + S)) : (L + S - (L * S));
    const temp_2 = (2 * L) - temp_1;
    
    // 100% / 3 = 33.333...
    let temp_RGB = [
      +(H + 0.333).toFixed(3),
      +(H).toFixed(3),
      +(H - 0.333).toFixed(3)
    ];

    // The temporary rgb values are kept between 0 and 1
    temp_RGB = temp_RGB.map(e => e < 0 ? e+1 : e > 1 ? e-1 : e);

    // RGB
    RGB = RGB.map((e, i) => {
      if (6 * temp_RGB[i] < 1) {
        return temp_2 + (temp_1 - temp_2) * 6 * temp_RGB[i];
      } else if (2 * temp_RGB[i] < 1) {
        return temp_1;
      } else if (3 * temp_RGB[i] < 2) {
        return temp_2 + (temp_1 - temp_2) * 6 * (0.666 - temp_RGB[i]);
      } else {
        return temp_2;
      }
    });

    // Converted to 8-bit color values
    RGB = RGB.map(e => Math.round(e * 255));
  }

  return { r: RGB[0], g: RGB[1], b: RGB[2] };
}


export const RGBtoCMYK = (r, g, b) => {
  // If the parameter values are out of range or not numbers, the default is returned
  if (r > 255  || g > 255  || b > 255 || 
      r < 0    || g < 0    || b < 0   ||
      isNaN(r) || isNaN(g) || isNaN(b)
  ) return { c: 0, m: 0, y: 0, k: 1 };

  // 
  let CMYK = [
    1 - (r/255),
    1 - (g/255),
    1 - (b/255),
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


export const CMYKtoRGB = (c, m, y, k) => {
  // If the parameter values are out of range or not numbers, the default value is returned.
  if (c > 100  || m > 100  || y > 100  || k > 100 || 
      c < 0    || m < 0    || y < 0    || k < 0   ||
      isNaN(c) || isNaN(m) || isNaN(y) || isNaN(k)
  ) return { r: 0, g: 0, b: 0 };

  // The CMYK values are converted to decimals
  const C = c * 0.01;
  const M = m * 0.01;
  const Y = y * 0.01;
  const K = k * 0.01;
  // The RGB values are calculated from the CMY respectively
  let RGB = [C, M, Y];

  // RGB
  // Formula for RGB values
  RGB = RGB.map(e => Math.round(255 * (1 - e) * (1 - K)));
  
  return { r: RGB[0], g: RGB[1], b: RGB[2] };
}


// RGB to CIELab
export const RGBtoLAB =  (R, G, B) => {
  const XYZ = RGBtoXYZ(R, G, B);
  return XYZtoLAB(XYZ.x, XYZ.y, XYZ.z);
}

const RGBtoXYZ = (R, G, B) => {
  // If the parameter values are out of range or not numbers, the default value is returned.
  if (R > 255  || G > 255  || B > 255 || 
      R < 0    || G < 0    || B < 0   ||
      isNaN(R) || isNaN(G) || isNaN(B)
  ) return { x: 0, y: 0, z: 0 };

  let RGB = [R/255, G/255, B/255];
  let X = 0, Y = 0, Z = 0;

  RGB = RGB.map(e => e > 0.04045 ? Math.pow((e + 0.055)/1.055, 2.4) : e/12.92)
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


export const LABtoRGB = (L, a, b) => {
  const XYZ = LABtoXYZ(L, a, b);
  return XYZtoRGB(XYZ.x, XYZ.y, XYZ.z);
}

const LABtoXYZ = (L, a, b) => {
  // If the parameter values are out of range or not numbers, the default is returned
  if (L > 100 || a > 127  || b > 127  || 
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
  RGB = RGB.map(e => e > 0.0031308 ? (1.055 * Math.pow(e, 1/2.4) - 0.055) : (12.92 * e))
           .map(e => e * 255)
           .map(e => Math.round(e));

  return { r: RGB[0], g: RGB[1], b: RGB[2] };
}