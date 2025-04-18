import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import BoQBuilder from "./pages/BoQBuilder";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/builder" element={<BoQBuilder />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
