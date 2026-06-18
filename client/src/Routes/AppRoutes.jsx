import { Routes, Route } from "react-router-dom";

import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Dashboard from "../pages/Dashboard/Dashboard";
import ProtectedRoute from "../components/ProtectedRoute";
import AddJob from "../pages/Jobs/AddJob";
import Jobs from "../pages/Jobs/Jobs";
import MainLayout from "../layouts/MainLayout";
import EditJob from "../pages/Jobs/EditJob";

function AppRoutes() {
  return (
    <Routes>

      <Route element={<MainLayout />}>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
            path="/dashboard"
             element={
        <ProtectedRoute>
          <Dashboard />
         </ProtectedRoute>
         }
        />
        <Route
        path="/jobs/add"
        element={
        <ProtectedRoute>
        <AddJob />
        </ProtectedRoute>
         }
        />
        <Route
         path="/jobs"
        element={
        <ProtectedRoute>
         <Jobs />
        </ProtectedRoute>
  }
/> 
    
        <Route
        path="/jobs/edit/:id"
        element={
        <ProtectedRoute>
      <EditJob />
        </ProtectedRoute>
  }
/>   

      </Route>

    </Routes>
  );
}


export default AppRoutes;