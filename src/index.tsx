import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import App from "./App";

import { QueryClientProvider } from "react-query";

import { Provider } from "react-redux";
import store from "./lighthouses/redux-lighthouse";
import client from "./lighthouses/query-lighthouse";

ReactDOM.render(
    <React.StrictMode>
        <QueryClientProvider client={client}>
            <Provider store={store}>
                <App />
            </Provider>
        </QueryClientProvider>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
