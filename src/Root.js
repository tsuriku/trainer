import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom"
import store from "./store";
import App from "./App.js"

const Root = () => (
    <App />
)

export default Root;