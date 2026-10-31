import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import "./App.css";

const Login = lazy(() => import("./pages/Auth/Login"));
const Register = lazy(() => import("./pages/Auth/Register"));
const Home = lazy(() => import("./pages/User/Home"));
const ThreadPage = lazy(() => import("./pages/User/ThreadPage"));
const Profile = lazy(() => import("./pages/User/Profile"));

function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <Header />
        <div className="app-container">
          <main className="main-center-content">
            <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/home"
                element={
                  <PrivateRoute>
                    <Home />
                  </PrivateRoute>
                }
              />
              <Route
                path="/thread/:id"
                element={
                  <PrivateRoute>
                    <ThreadPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                }
              />

              <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
            </Suspense>
          </main>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
