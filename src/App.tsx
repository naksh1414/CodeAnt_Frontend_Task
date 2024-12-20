import LoginPage from "./pages/Login/LoginPage";
import RepositoriesDashboard from "./pages/Home/DashBoard";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<RepositoriesDashboard />} />
      </Routes>
    </Provider>
  );
}

export default App;
