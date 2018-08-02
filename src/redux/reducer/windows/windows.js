import { 
  OPEN_WINDOW,
  CLOSE_WINDOW
} from './actions';

const initialState = {
  isOpen: false,
  newProject: false,
  colorPicker: false
};

// Reducer
export default (state = initialState, action) => {
  const { type, payload } = action;
  
  switch (type) {
    case OPEN_WINDOW:
      return payload(state);
    case CLOSE_WINDOW:
      return payload(state);
    default:
      return state;
  }
}