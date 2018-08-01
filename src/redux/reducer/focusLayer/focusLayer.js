import { 
  FOCUS_CANVAS,
  UNFOCUS_CANVAS,
  UPDATE_OFFSET,
} from './actions';

const initialState = {
  focus: null,
  onMouseMove: null,
  onMouseUp: null,
  onMouseLeave: null,
  offset: { width: 0, height: 0 }
};

// Reducer
export default (state = initialState, action) => {
  const { type, payload } = action;
  
  switch (type) {
    case FOCUS_CANVAS:
      return payload(state);
    case UNFOCUS_CANVAS:
      return payload(state);
    case UPDATE_OFFSET:
      return payload(state);
    default:
      return state;
  }
}