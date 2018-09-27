// Color Converters
import { 
  RGBtoHex, 
  // RGBtoCMYK, 
  RGBtoHSL, 
  // RGBtoLAB, 
  // CMYKtoRGB, 
  // HSLtoRGB, 
  // LABtoRGB 
} from '../../../helpers/colorConversion';

// Action Types
export const 
  UPDATE_GRADIENT_HUE = 'UPDATE_GRADIENT_HUE',
  UPDATE_GRADIENT_DIMENSIONS = 'UPDATE_GRADIENT_DIMENSIONS';

// Action Creators
export const updateGradientHue = (rgb) => ({
  type: UPDATE_GRADIENT_HUE,
  payload: (state) => {
    const hueGradient = {
      rgb: rgb,
      hex: RGBtoHex(rgb),
      hue: RGBtoHSL(rgb).h
    };

    console.log('updateGradientHue', hueGradient);
    return {...state, hueGradient };
  }
});

export const updateGradientDimensions = (dimensions) => ({
  type: UPDATE_GRADIENT_DIMENSIONS,
  payload: (state) => {
    const width = dimensions.width;
    const height = dimensions.height;

    console.log('updateGradientDimensions', width, height);
    return {...state, width, height };
  }
});