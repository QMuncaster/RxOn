import { createStore, combineReducers } from "redux";

// basic reducer
const fooReducer = (state = {}, action) => {
  return state;
};
// root reducer
const reducer = combineReducers({
  foo: fooReducer
});
// create store
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
