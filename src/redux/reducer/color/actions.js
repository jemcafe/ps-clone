// Color Converters
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
export const 
  SELECT_COLOR = 'SELECT_COLOR',
  RESET_COLORS = 'RESET_COLORS',
  SWAP_COLORS = 'SWAP_COLORS',
  UPDATE_COLOR = 'UPDATE_COLOR',
  UPDATE_COLOR_POSITION = 'UPDATE_COLOR_POSITION';

// Action Creators
export const selectColor = (property) => ({  // 'frgd' or 'bkgd'
  type: SELECT_COLOR,
  payload: (state) => ({...state, selected: property })
});

export const resetColors = () => ({
  type: RESET_COLORS,
  payload: (state) => {
    const { frgd, bkgd } = state;
    let rgb = null;

    for (let i in state) {
      if (i === 'frgd' || i === 'bkgd') {
        rgb = i === 'frgd' ? { r: 0, g: 0, b: 0 } : { r: 255, g: 255, b: 255 };
        state[i].rgb = rgb;
        state[i].hex = RGBtoHex(rgb);
        state[i].cmyk = RGBtoCMYK(rgb);
        state[i].hsl = RGBtoHSL(rgb);
        state[i].lab = RGBtoLAB(rgb);
        state[i].hue = { r: 255, g: 0, b: 0, hex: '#ff0000' };
        state[i].x = 0;
        state[i].y = 0;
      }
    }

    // console.log('frgd', frgd, 'bkgd', bkgd);
    return {...state, frgd, bkgd };
  }
});

export const swapColors = () => ({
  type: SWAP_COLORS,
  payload: (state) => {
    const { frgd, bkgd } = state;
    // console.log('frgd', frgd, 'bkgd', bkgd);
    return {...state, frgd: bkgd, bkgd: frgd };
  }
});

export const updateColor = ({rgb, hue, pos}) => ({
  type: UPDATE_COLOR,
  payload: (state) => {
    const { selected } = state;
    const color = {...state[selected]};

    color.rgb = rgb;
    color.hex = RGBtoHex(rgb);
    color.cmyk = RGBtoCMYK(rgb);
    color.hsl = RGBtoHSL(rgb);
    color.lab = RGBtoLAB(rgb);
    color.hue = hue;
    color.x = pos.x;
    color.y = pos.y;

    return {...state, [selected]: color }
  }
});

export const updateColorPosition = (pos) => ({
  type: UPDATE_COLOR,
  payload: (state) => {
    const { selected } = state;
    const color = {...state[selected]};
    color.x = pos.x;
    color.y = pos.y;
    // console.log('updateColorPosition', pos.x, pos.y);
    return {...state, [selected]: color }
  }
});