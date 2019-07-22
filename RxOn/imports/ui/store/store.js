import { createStore, combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { reducer as modal } from 'redux-modal'

// root reducer
const reducer = combineReducers({
  modal: modal,
  form: formReducer
});
// create store
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
