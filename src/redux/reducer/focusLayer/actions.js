// Action Types
export const 
  FOCUS_CANVAS = 'FOCUS_CANVAS',
  UNFOCUS_CANVAS = 'UNFOCUS_CANVAS',
  UPDATE_OFFSET = 'UPDATE_OFFSET';

// Action Creators
export const focusCanvas = ({focus, onMouseMove, onMouseUp, onMouseLeave}) => ({
  type: FOCUS_CANVAS,
  payload: (state) => {
    return {...state, focus, onMouseMove, onMouseUp, onMouseLeave };
  }
});

export const unfocusCanvas = () => ({
  type: UNFOCUS_CANVAS,
  payload: (state) => {
    return {...state, focus: false };
  }
});

export const updateOffset = (offset) => ({
  type: UPDATE_OFFSET,
  payload: (state) => {
    return {...state, offset };
  }
});