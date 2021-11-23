import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./static/fonts/font.css";
import {Provider} from "react-redux";
import {createStore,applyMiddleware} from "redux";
import createSagaMiddleware from 'redux-saga';
import rootReducer, {rootSaga} from "./modules";
import {check, tempSetUser} from "./modules/user";
import {composeWithDevTools} from "redux-devtools-extension";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(sagaMiddleware)));

function loadUser() {
  try {
    const user = localStorage.getItem('user');
    if(!user) return;
    store.dispatch(tempSetUser(JSON.parse(user)));
    store.dispatch(check());
  } catch(e) {
    console.log('localStorage가 작동하지 않습니다');
  }
}

sagaMiddleware.run(rootSaga);
loadUser();

ReactDOM.render(
    <Provider store={store}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
    </Provider>,
  document.getElementById("root")
);
