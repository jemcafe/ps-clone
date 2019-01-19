import swatchColors from '../../../constants/swatchColors';

import { 
  color as c
} from '../../../helpers/color';

import { 
  RGBtoHex,
  // RGBtoCMYK,
  // RGBtoHSL,
  // RGBtoLAB,
  // CMYKtoRGB,
  // HSLtoRGB,
  HSVtoRGB,
  // LABtoRGB
} from '../../../helpers/colorConversion';

// Action Types
export const 
  ADD_SWATCH = 'ADD_SWATCH',
  DELETE_SWATCH = 'DELETE_SWATCH',
  ADD_RECENT_SWATCH = 'ADD_RECENT_SWATCH';

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

export const addRecentSwatch = ({name, color, hsv}) => ({
  type: ADD_RECENT_SWATCH,
  payload: (state) => {
    const recentColors = [...state.recentColors];
    let rgb, hex;
    
    if (color) {
      rgb = color.rgb;
      hex = color.hex;
    }

    if (hsv) {
      rgb = HSVtoRGB(hsv);
      hex = RGBtoHex(rgb);
    }

    // The color is moved to the front if it's already in the list
    for (let i = 0; i < recentColors.length; i++) {
      if (recentColors[i].hex === hex) {
        recentColors.unshift(recentColors[i]);
        recentColors.splice(i+1, 1);
        return {...state, recentColors };
      }
    }

    // New color is added to the list
    if (recentColors.length <= 11) {
      recentColors.unshift(c(rgb));
    }

    // Max of 12
    if (recentColors.length > 11) {
      recentColors.pop();
      recentColors.unshift(c(rgb));
    }

    console.log('recentColors', recentColors)
    return {...state, recentColors };
  }
});