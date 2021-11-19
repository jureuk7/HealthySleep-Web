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

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer,applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <Provider store={store}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
    </Provider>,
  document.getElementById("root")
);
