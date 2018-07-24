// // Color Converters
import { 
  RGBtoHex, 
  RGBtoCMYK, 
  RGBtoHSL, 
  RGBtoLAB, 
  // CMYKtoRGB, 
  // HSLtoRGB, 
  // LABtoRGB 
} from '../../../helpers/colorConversion';

// Action Types
export const SELECT_COLOR = 'SELECT_COLOR',
             RESET_COLORS = 'RESET_COLORS',
             SWAP_COLORS = 'SWAP_COLORS',
             UPDATE_COLOR = 'UPDATE_COLOR',
             UPDATE_COLOR_POSITION = 'UPDATE_COLOR_POSITION';

// Action Creators
export const selectColor = (num) => ({
  type: SELECT_COLOR,
  payload: (state) => {
    const property = `color_${num}`;
    const { color_1, color_2 } = state;

    for (let i in state) {
      if (i === property) {
        state[i].selected = true;
      } else {
        state[i].selected = false; 
      }
    }
    
    return {...state, color_1, color_2 }
  }
});

export const resetColors = () => ({
  type: RESET_COLORS,
  payload: (state) => {
    const { color_1, color_2 } = state;
    let rgb = null;

    for (let i in state) {
      rgb = i === 'color_1' ? { r: 0, g: 0, b: 0 } : { r: 255, g: 255, b: 255 };
      state[i].rgb = rgb;
      state[i].hex = RGBtoHex(rgb.r, rgb.g, rgb.b);
      state[i].cmyk = RGBtoCMYK(rgb.r, rgb.g, rgb.b);
      state[i].hsl = RGBtoHSL(rgb.r, rgb.g, rgb.b);
      state[i].lab = RGBtoLAB(rgb.r, rgb.g, rgb.b);
      state[i].x = 0;
      state[i].y = 0;
    }

    return {...state, color_1, color_2 }
  }
});

export const swapColors = () => ({
  type: SWAP_COLORS,
  payload: (state) => {
    const { color_1, color_2 } = state;

    const temp = color_1.selected;
    color_1.selected = color_2.selected;
    color_2.selected = temp;
    
    return {...state, color_1: color_2, color_2: color_1};
  }
});

export const updateColor = ({rgb, pos}) => ({
  type: UPDATE_COLOR,
  payload: (state) => {
    let property = null;

    for (let i in state) {
      if (state[i].selected) {
        property = i;
        state[i].hex = RGBtoHex(rgb.r, rgb.g, rgb.b);
        state[i].cmyk = RGBtoCMYK(rgb.r, rgb.g, rgb.b);
        state[i].hsl = RGBtoHSL(rgb.r, rgb.g, rgb.b);
        state[i].lab = RGBtoLAB(rgb.r, rgb.g, rgb.b);
        state[i].x = pos.x;
        state[i].y = pos.y;
      }
    }

    // console.log(property, state[property]);
    return {...state, [property]: state[property] }
  }
});

export const updateColorPosition = (pos) => ({
  type: UPDATE_COLOR,
  payload: (state) => {
    let property = null;

    for (let i in state) {
      if (state[i].selected) {
        property = i;
        state[i].x = pos.x;
        state[i].y = pos.y;
      }
    }

    // console.log('color position', pos);
    return {...state, [property]: state[property] }
  }
});