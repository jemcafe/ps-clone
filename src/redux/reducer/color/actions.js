import { color as c } from '../../../helpers/color';

import { 
  RGBtoHex, 
  RGBtoCMYK, 
  RGBtoHSL, 
  RGBtoLAB, 
  // CMYKtoRGB, 
  HSVtoRGB, 
  // HSLtoRGB, 
  // LABtoRGB 
} from '../../../helpers/colorConversion';

// Action types
export const 
  SELECT_COLOR = 'SELECT_COLOR',
  RESET_COLORS = 'RESET_COLORS',
  SWAP_COLORS = 'SWAP_COLORS',
  UPDATE_COLOR = 'UPDATE_COLOR',
  UPDATE_COLOR_POSITION = 'UPDATE_COLOR_POSITION';

// Action Creators
export const selectColor = (frgd_bkgd) => ({
  type: SELECT_COLOR,
  payload: (state) => ({ ...state, selected: frgd_bkgd })
});

export const resetColors = () => ({
  type: RESET_COLORS,
  payload: (state) => {
    const frgd = c({ r: 0, g: 0, b: 0 });
    const bkgd = c({ r: 255, g: 255, b: 255 });
    return { ...state, frgd, bkgd };
  }
});

export const swapColors = () => ({
  type: SWAP_COLORS,
  payload: (state) => {
    const frgd = { ...state.bkgd }
    const bkgd = { ...state.frgd }
    return { ...state, frgd, bkgd }
  }
});

export const updateColor = ({rgb, hsv}) => ({
  type: UPDATE_COLOR,
  payload: (state) => {
    const { selected } = state;
    let color = { ...state[state.selected] };
    // console.log('updateColor hsv', hsv)

    if (rgb) {

      color = c(rgb);

    } else if (hsv) {

      color = c(
        HSVtoRGB({
          h: hsv.h ? hsv.h : color.hsv.h,
          s: hsv.s ? hsv.s : color.hsv.s,
          v: hsv.v ? hsv.v : color.hsv.v
        })
      );

      if (color.hex === '#ffffff' || color.hex === '#000000') {
        color.hue.hue = hsv.h ? hsv.h : color.hsv.h;
        color.hue.rgb = HSVtoRGB({ h: color.hue.hue, s: 100, v: 100 });
        color.hue.hex = RGBtoHex(color.hue.rgb);
        console.log('updateColor hue', color.hue.hue)
      }

    } 
    console.log('updateColor color', color)

    return { ...state, [selected]: color };
  }
});