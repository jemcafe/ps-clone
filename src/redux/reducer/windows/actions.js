// Action Types
export const OPEN_WINDOW = 'OPEN_WINDOW',
             CLOSE_WINDOW = 'CLOSE_WINDOW';

// Action Creators
export const openWindow = (property) => ({
  type: OPEN_WINDOW,
  payload: (state) => {
    console.log(property, 'open');
    return {...state, [property]: true };
  }
});

export const closeWindow = (property) => ({
  type: CLOSE_WINDOW,
  payload: (state) => {
    console.log(property, 'closed');
    return {...state, [property]: false };
  }
});