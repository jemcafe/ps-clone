// Color Converters
import { 
  // RGBtoHex, 
  // RGBtoCMYK, 
  // RGBtoHSL, 
  // RGBtoLAB, 
  // CMYKtoRGB, 
  // HSLtoRGB, 
  // LABtoRGB 
} from '../../../helpers/colorConversion';

// Action Types
export const 
  SELECT_SWATCH = 'SELECT_SWATCH',
  ADD_SWATCH = 'ADD_SWATCH';

// Action Creators
export const selectSwatch = (index) => ({
  type: SELECT_SWATCH,
  payload: (state) => {
    return {...state }
  }
});

export const addSwatch = (swatch) => ({
  type: ADD_SWATCH,
  payload: (state) => {
    return {...state }
  }
});