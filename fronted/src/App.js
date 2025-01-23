
import './App.css';
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import Navbar from "./components/Navbar";
import Chat from "./components/Chat";
import store from "./redux/store";
import theme from "./theme";



function App() {
  return (
    <div className="App">
        <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Navbar />
        <Chat />
      </ThemeProvider>
    </Provider>
    </div>
  );
}

export default App;
