import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import OrganizationWrapper from "./organization-wrapper";
import Landing from "./pages/landing/landing";
import { MantineProvider } from "@mantine/core";
import AdminRoutes from "./routes/admin";
import EmployeeRoutes from "./routes/user";

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
      </Routes>
    </Router>
  );
};

export default App;
