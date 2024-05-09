import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Welcome from "./components/Welcome";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { useAuth } from "./components/AuthContext";

function App() {
  const { isLoggedIn } = useAuth();

  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? <Navigate to="/dashboard" /> : <Welcome />}
          />

          <Route
            path="/login"
            element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />}
          />

          <Route
            path="/dashboard/*"
            element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
          />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
