import LoginPage from "./pages/Login/LoginPage";
import RepositoriesDashboard from "./pages/Home/DashBoard";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { initializeAuthListener } from "./services/auth";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import { useNavigate } from "react-router-dom";
function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    // Set up the auth listener when the app starts
    const unsubscribe = initializeAuthListener(dispatch);
    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, [dispatch]);

  if(!user) {
    navigate("/");
  }

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<RepositoriesDashboard />} />
    </Routes>
  );
}

export default App;
