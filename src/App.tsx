import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import OrganizationWrapper from "./organization-wrapper";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>Landing</h1>} />
        <Route path="/:organization/*" element={<OrganizationWrapper />} />
      </Routes>
    </Router>
  );
};

export default App;
