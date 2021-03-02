import React, { Component } from 'react';

// import axios from "axios";
// import ThemeFormContainer from "containers/ThemeFormContainer";
import { Route } from "react-router-dom";
import {
  ViakissKeybordPattern
} from "pages";

class App extends Component {
  render() {
    return (
      <>
        <Route path="/" component={ViakissKeybordPattern} />
      </>
    );
  }
}

export default App;
