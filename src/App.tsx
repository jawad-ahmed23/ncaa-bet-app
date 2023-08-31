import { Routes, Route } from "react-router-dom";
import Dashboard from "./containers/Dashboard";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
