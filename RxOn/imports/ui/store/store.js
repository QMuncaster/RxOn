import { createStore, combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

// stub reducer
const stubReducer = (state = {}, action) => {
  return state;
};
// root reducer
const reducer = combineReducers({
  // this does not do anything but I have it here to play with for manual testing
  stub: stubReducer,
  form: formReducer
});
// create store
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
