import { applyMiddleware, compose, createStore } from 'redux';

import rootReducer from './rootReducer';

import thunk from 'redux-thunk';

const store = createStore(
    rootReducer,
    {},
    compose(
      applyMiddleware(thunk),
      (window as any).devToolsExtension ? (window as any).devToolsExtension() : undefined
    )
  );

export default store;
