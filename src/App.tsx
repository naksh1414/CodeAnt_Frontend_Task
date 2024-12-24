import LoginPage from "./pages/Login/LoginPage";
import RepositoriesDashboard from "./pages/Home/DashBoard";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { initializeAuthListener } from "./services/auth";
import { useEffect } from "react";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    // Set up the auth listener when the app starts
    const unsubscribe = initializeAuthListener(dispatch);
    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, [dispatch]);
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<RepositoriesDashboard />} />
    </Routes>
  );
}

export default App;
