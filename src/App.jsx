import { BrowserRouter, Routes, Route } from "react-router-dom";
import WishForm from "./pages/WishForm";
import Dashboard from "./pages/Dashboard";
import Display from "./pages/Display";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WishForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/display" element={<Display />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;