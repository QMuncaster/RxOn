import { createStore, combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

// root reducer
const reducer = combineReducers({
  form: formReducer
});
// create store
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
