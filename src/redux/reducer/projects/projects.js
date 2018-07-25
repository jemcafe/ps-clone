import { 
  CREATE_PROJECT,
  REMOVE_PROJECT,
  CHANGE_TAB
} from './actions';

const initialState = {
  projects: [],
  tab: 0
};

// Reducer
export default (state = initialState, action) => {
  const { type, payload } = action;
  
  switch (type) {
    case CREATE_PROJECT:
      return payload(state);
    case REMOVE_PROJECT:
      return payload(state);
    case CHANGE_TAB:
      return payload(state);
    default:
      return state;
  }
}