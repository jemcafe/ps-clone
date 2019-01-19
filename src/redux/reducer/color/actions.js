import { 
  color as c
} from '../../../helpers/color';

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
  payload: (state) => ({
    ...state, 
    selected: frgd_bkgd
  })
});

export const resetColors = () => ({
  type: RESET_COLORS,
  payload: (state) => ({
    ...state,
    frgd: c({ r: 0, g: 0, b: 0 }),
    bkgd: c({ r: 255, g: 255, b: 255 })
  })
});

export const swapColors = () => ({
  type: SWAP_COLORS,
  payload: (state) => ({
    ...state,
    frgd: { ...state.bkgd },
    bkgd: { ...state.frgd }
  })
});

export const updateColor = ({rgb, hsv}) => ({
  type: UPDATE_COLOR,
  payload: (state) => {
    const { selected } = state;
    let selectedColor = { ...state[state.selected] };

    if (rgb) {
      selectedColor = c(rgb);
    } else if (hsv) {
      selectedColor = c(HSVtoRGB({
        h: hsv.h ? hsv.h : selectedColor.hsv.h,
        s: hsv.s ? hsv.s : selectedColor.hsv.s,
        v: hsv.v ? hsv.v : selectedColor.hsv.v
      }));

      if (selectedColor.hex === '#ffffff' || selectedColor.hex === '#000000') {
        selectedColor.hue.hue = hsv.h ? hsv.h : selectedColor.hsv.h;
        selectedColor.hue.rgb = HSVtoRGB({h: selectedColor.hue.hue, s: 100, v: 100 });
        selectedColor.hue.hex = RGBtoHex(selectedColor.hue.rgb);
        console.log('updateColor hue', selectedColor.hue.hue)
      }
    }

    console.log('updateColor color', selectedColor)
    return { ...state, [selected]: selectedColor };
  }
});