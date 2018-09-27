import { 
  RGBtoHex, 
  RGBtoCMYK, 
  RGBtoHSL, 
  RGBtoLAB,
  HSLtoRGB
} from './colorConversion';

export const color = (rgb) => {
  const hex = RGBtoHex(rgb);
  const cmyk = RGBtoCMYK(rgb);
  const hsl = RGBtoHSL(rgb);
  const lab = RGBtoLAB(rgb);
  const hue = {};
  const x = 0;
  const y = 0;

  hue.rgb = (hex === '#000000' || hex === '#ffffff') 
    ? { r: 255, g: 0, b: 0 } 
    : HSLtoRGB({h: hsl.h, s: 100, l: 50});
  hue.hex = RGBtoHex(hue.rgb);
  hue.hue = hsl.h;
  
  return { hex, rgb, cmyk, hsl, lab, hue, x, y };
}