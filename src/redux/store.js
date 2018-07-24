import { createStore, compose } from 'redux';
import rootReducer from './reducer/index';

const store = createStore(rootReducer, compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f  // Checks the window for the redx devtools extension.
));

export default store;