// Color Converters
import { 
  RGBtoHex, 
  // RGBtoHSV, 
  HSVtoRGB 
} from '../../../helpers/colorConversion';

// Action Types
export const 
  UPDATE_GRADIENT_HUE = 'UPDATE_GRADIENT_HUE',
  UPDATE_GRADIENT_DIMENSIONS = 'UPDATE_GRADIENT_DIMENSIONS',
  UPDATE_COLOR_POSITION = 'UPDATE_COLOR_POSITION';

// Action Creators
export const updateGradientHue = (hue) => ({
  type: UPDATE_GRADIENT_HUE,
  payload: (state) => {
    const hueGradient = {...state.hueGradient};
    hueGradient.hue = hue;
    hueGradient.rgb = HSVtoRGB({ h: hue, s: 100, v: 100 });
    hueGradient.hex = RGBtoHex(hueGradient.rgb);

    // console.log('updateGradientHue', hueGradient);
    return {...state, hueGradient };
  }
});

export const updateGradientDimensions = ({width, height, x, y}) => ({
  type: UPDATE_GRADIENT_DIMENSIONS,
  payload: (state) => {
    const hueGradient = {...state.hueGradient};
    hueGradient.width = width;
    hueGradient.height = height;
    hueGradient.x = x;
    hueGradient.y = y;

    // console.log('updateGradientDimensions', width, height);
    return {...state, hueGradient };
  }
});

export const updateColorPosition = ({x, y}) => ({
  type: UPDATE_COLOR_POSITION,
  payload: (state) => {
    const hueGradient = {...state.hueGradient};
    hueGradient.x = x;
    hueGradient.y = y;

    // console.log('updateGradientDimensions', width, height);
    return {...state, hueGradient };
  }
});

