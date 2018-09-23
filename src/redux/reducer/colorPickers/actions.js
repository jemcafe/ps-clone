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
  UPDATE_GRADIENT_HUE = 'UPDATE_GRADIENT_HUE',
  UPDATE_GRADIENT_DIMENSIONS = 'UPDATE_GRADIENT_DIMENSIONS';

// Action Creators
export const updateGradientHue = (rgb) => ({
  type: UPDATE_GRADIENT_HUE,
  payload: (state) => {
    const hg = {...state.hueGradient};
    hg.hue.rgb = rgb;
    hg.hue.hex = RGBtoHex(rgb);

    console.log('updateGradientHue', hg.hue);
    return {...state, hueGradient: hg };
  }
});

export const updateGradientDimensions = ({colorPicker, dimensions}) => ({
  type: UPDATE_GRADIENT_DIMENSIONS,
  payload: (state) => {
    const cp = {...state[colorPicker]};

    cp.width = dimensions.width;
    cp.height = dimensions.height;

    console.log('updateGradientDimensions', cp.width, cp.height);
    return {...state, [colorPicker]: cp };
  }
});