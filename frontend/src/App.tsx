import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

// These pages are loaded only when they are needed.
const Login = lazy(() => import("./pages/LoginPage"));
const Register = lazy(() => import("./pages/RegisterPage"));
const EditorPage = lazy(() => import("./pages/EditorPage"));

const App = () => {
  return (
    // This shows a small loading message while a page is loading.
    <Suspense fallback={<div className="app-loading">Loading...</div>}>
      <Routes>
        {/* When someone opens the home page, send them to the editor. */}
        <Route path="/" element={<Navigate to="/editor" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* The editor is protected, so only logged-in users can open it. */}
        <Route
          path="/editor"
          element={
            <ProtectedRoute>
              <EditorPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Suspense>
  );
};

export default App;
