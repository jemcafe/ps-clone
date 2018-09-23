// Color Converters
import { 
  RGBtoHex, 
  // RGBtoCMYK, 
  // RGBtoHSL, 
  // RGBtoLAB, 
  // CMYKtoRGB, 
  // HSLtoRGB, 
  // LABtoRGB 
} from '../../../helpers/colorConversion';

// Action Types
export const 
  ADD_SWATCH = 'ADD_SWATCH',
  DELETE_SWATCH = 'DELETE_SWATCH',
  ADD_RECENT_COLOR = 'ADD_RECENT_COLOR';

// Action Creators
export const addSwatch = (name, rgb) => ({
  type: ADD_SWATCH,
  payload: (state) => {
    const colors = [...state.colors];
    const hex = RGBtoHex(rgb);
    name = !name ? `swatch ${1}` : name;

    colors.push({ name, hex, rgb, new: true });

    return {...state, colors };
  }
});

export const deleteSwatch = (index) => ({
  type: DELETE_SWATCH,
  payload: (state) => {
    const colors = [...state.colors];
    colors.splice(index, 1);
    return {...state, colors };
  }
});

export const addRecentColor = (color) => ({
  type: ADD_RECENT_COLOR,
  payload: (state) => {
    const recentColors = [...state.recentColors];
    const colors = state.colors;
    const name = '';
    const hex = RGBtoHex(color.rgb);
    let temp = null;

    // The color is moved to the front if it's already in the list
    for (let i = 0; i < recentColors.length; i++) {
      if (recentColors[i].hex === hex) {
        temp = recentColors.splice(i, 1);
        recentColors.unshift(temp);
        return {...state, recentColors };
      } else {
        recentColors.unshift({});
        return {...state, recentColors };
      }
    }

    // New color is added to the list
    // recentColors.unshift({
    //   name: `swatch ${1}`,
    //   hex: hex,
    //   rgb: rgb
    // });

    return {...state, recentColors };
  }
});