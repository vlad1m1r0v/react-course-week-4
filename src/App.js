import Main from "./components/Main";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import store from "./redux/configureStore";
import { Provider } from "react-redux";

function App() {
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <Main />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
