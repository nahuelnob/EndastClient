import "./App.css";
import PadiV3 from "./views/PadiV3/PadiV3";
import { Route, Routes } from "react-router";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<PadiV3 />} />
      </Routes>
    </div>
  );
}

export default App;
