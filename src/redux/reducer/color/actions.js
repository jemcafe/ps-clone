import { color as c } from '../../../helpers/color';

import { 
  RGBtoHex, 
  RGBtoCMYK, 
  RGBtoHSL, 
  RGBtoLAB, 
  // CMYKtoRGB, 
  // HSLtoRGB, 
  // LABtoRGB 
} from '../../../helpers/colorConversion';

// ACTION TYPES
export const 
  SELECT_COLOR = 'SELECT_COLOR',
  RESET_COLORS = 'RESET_COLORS',
  SWAP_COLORS = 'SWAP_COLORS',
  UPDATE_COLOR = 'UPDATE_COLOR',
  UPDATE_COLOR_POSITION = 'UPDATE_COLOR_POSITION',
  
  UPDATE_GRADIENT_HUE = 'UPDATE_GRADIENT_HUE',
  UPDATE_GRADIENT_DIMENSIONS = 'UPDATE_GRADIENT_DIMENSIONS';

// ACTION CREATORS
export const selectColor = (frgd_bkgd) => ({
  type: SELECT_COLOR,
  payload: (state) => ({...state, selected: frgd_bkgd })
});

export const resetColors = () => ({
  type: RESET_COLORS,
  payload: (state) => {
    const frgd = c({r: 0, g: 0, b: 0});
    const bkgd = c({r: 255, g: 255, b: 255});

    // console.log('frgd', frgd); 
    // console.log('bkgd', bkgd);
    return {...state, frgd, bkgd };
  }
});

export const swapColors = () => ({
  type: SWAP_COLORS,
  payload: (state) => {
    const { frgd, bkgd } = state;
    return {...state, frgd: bkgd, bkgd: frgd };
  }
});

export const updateColor = ({rgb, hue, pos}) => ({
  type: UPDATE_COLOR,
  payload: (state) => {
    const { selected } = state;

    const color = c(rgb);
    color.x = pos.x;
    color.y = pos.y;
    color.hue = hue ? hue : color.hue;

    // console.log('updateColor', color);
    return {...state, [selected]: color }
  }
});

export const updateColorPosition = (pos) => ({
  type: UPDATE_COLOR,
  payload: (state) => {
    const { selected } = state;
    const color = {...state[selected]};

    if (pos) {
      color.x = pos.x;
      color.y = pos.y;
    } 

    // console.log('updateColorPosition', { x: color.x, y: color.y });
    return {...state, [selected]: color }
  }
});

export const updateGradientHue = (rgb) => ({
  type: UPDATE_GRADIENT_HUE,
  payload: (state) => {
    const colorPickers = {...state.colorPickers};
    colorPickers.hueGradient = {
      rgb: rgb,
      hex: RGBtoHex(rgb),
      hue: RGBtoHSL(rgb).h
    };

    console.log('updateGradientHue', colorPickers.hueGradient);
    return {...state, colorPickers };
  }
});

export const updateGradientDimensions = ({width, height}) => ({
  type: UPDATE_GRADIENT_DIMENSIONS,
  payload: (state) => {
    const colorPickers = {...state.colorPickers};
    colorPickers.width = width;
    colorPickers.height = height;

    console.log('updateGradientDimensions', colorPickers.width, colorPickers.height);
    return {...state, colorPickers };
  }
});