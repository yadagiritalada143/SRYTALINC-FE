import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import OrganizationWrapper from "./organization-wrapper";
import Landing from "./pages/landing/landing";
import { MantineProvider } from "@mantine/core";

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
        <Route path="/:organization/*" element={<OrganizationWrapper />} />
      </Routes>
    </Router>
  );
};

export default App;
