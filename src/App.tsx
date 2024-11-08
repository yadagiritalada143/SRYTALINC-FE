import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./pages/landing/landing";
import { MantineProvider } from "@mantine/core";
import AdminRoutes from "./routes/admin";
import EmployeeRoutes from "./routes/user";
import SuperAdminRoutes from "./routes/super-admin";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <MantineProvider>
              <Landing />
            </MantineProvider>
          }
        />
        <Route path="/admin/:organization/*" element={<AdminRoutes />} />
        <Route path="/employee/:organization/*" element={<EmployeeRoutes />} />
        <Route path="/superadmin/*" element={<SuperAdminRoutes />} />
      </Routes>
    </Router>
  );
};

export default App;
