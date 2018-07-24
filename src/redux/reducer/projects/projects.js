import { 
  CREATE_PROJECT,
} from './actions';

const initialState = {
  
};

// Reducer
export default (state = initialState, action) => {
  const { type, payload } = action;
  
  switch (type) {
    case CREATE_PROJECT:
      return payload(state);
    default:
      return state;
  }
}