import { BrowserRouter, Routes, Route } from "react-router-dom";
import WishForm from "./pages/WishForm";
import Dashboard from "./Pages/Dashboard";
import Display from "./Pages/Display";

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