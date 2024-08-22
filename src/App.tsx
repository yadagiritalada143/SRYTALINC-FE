import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/admin/login"
          element={<h1 className="text-3xl">Admin Login</h1>}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
