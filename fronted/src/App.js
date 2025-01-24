import './App.css';
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";  // Import React Router
import Chat from "./components/Chat";
import RegisterUser from "./components/RegisterUser";
import Login from "./components/Login";
import store from "./redux/store";
import theme from "./theme";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Router>  {/* Wrapping with Router */}
            <Navbar />
            <Routes> {/* Routing setup */}
              <Route path="/" element={<Navigate to="/login" />} />  {/* Redirect to /login when starting the app */}
              <Route path="/login" element={<Login />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/register" element={<RegisterUser />} />
            </Routes>
          </Router>
        </ThemeProvider>
      </Provider>
    </div>
  );
}

export default App;

