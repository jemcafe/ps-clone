// Action Types
export const CREATE_PROJECT = 'CREATE_PROJECT';

// Action Creators
export const createProject = () => ({
  type: CREATE_PROJECT,
  payload: (state) => {
    return {...state};
  }
});