import React from "react";
import Main from "./components/MainComponent";
import { BrowserRouter } from "react-router-dom";
import { store } from "./redux/configureStore";
import { Provider } from "react-redux";

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Main />
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
