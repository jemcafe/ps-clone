import { 
  CREATE_PROJECT,
  REMOVE_PROJECT
} from './actions';

const initialState = {
  tab: 0,
  projects: []
};

// Reducer
export default (state = initialState, action) => {
  const { type, payload } = action;
  
  switch (type) {
    case CREATE_PROJECT:
      return payload(state);
    case REMOVE_PROJECT:
      return payload(state);
    default:
      return state;
  }
}