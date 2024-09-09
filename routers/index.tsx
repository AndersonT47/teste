import { Routes, Route, Navigate } from "react-router-dom";

import Login from "@/pages/login";
import FeeManagement from "@/pages/app/feemanagement";
import PrivateRoute from "./PrivateRouter";
import Dashboard from "@/pages/app/dashboard";
import Impersonate from "@/pages/app/impersonate";
import RevenueReportPage from "@/pages/app/RevenueReportPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/app/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/app/feemanagement"
        element={
          <PrivateRoute>
            <FeeManagement />
          </PrivateRoute>
        }
      />
      <Route
        path="/app/feemanagement/:customerCif"
        element={
          <PrivateRoute>
            <FeeManagement />
          </PrivateRoute>
        }
      />
      <Route
        path="/app/feemanagement/:customerCif/:feeCaseNumber"
        element={
          <PrivateRoute>
            <FeeManagement />
          </PrivateRoute>
        }
      />
      <Route
        path="/app/impersonate"
        element={
          <PrivateRoute>
            <Impersonate />
          </PrivateRoute>
        }
      />
      <Route
        path="/app/revenue-report"
        element={
          <PrivateRoute>
            <RevenueReportPage />
          </PrivateRoute>
        }
      />
      <Route
        path="*"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
