import {
  RGBtoHex,
  RGBtoHSV,
  RGBtoHSL,
  RGBtoCMYK,
  RGBtoLAB,
  HSLtoRGB
} from './colorConversion';

export const color = (rgb) => {
  const hex = RGBtoHex(rgb);
  const hsv = RGBtoHSV(rgb);
  const hsl = RGBtoHSL(rgb);
  const cmyk = RGBtoCMYK(rgb);
  const lab = RGBtoLAB(rgb);
  const hue = {};
  hue.hue = hsl.h;
  hue.rgb = HSLtoRGB({h: hsl.h, s: 100, l: 50});
  hue.hex = RGBtoHex(hue.rgb);
  
  return { hex, rgb, hsv, hsl, cmyk, lab, hue };
}