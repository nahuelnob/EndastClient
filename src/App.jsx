import "./App.css";
import PadiV3 from "./views/PadiV3/PadiV3";
import { Route, Routes } from "react-router";
import PadiV3placa2 from "./views/PadiV3/PadiV3placa2";

function App() {
  return (
    <div>
      <Routes>
        {/* <Route path="/1" element={<PadiV3 />} /> */}
        <Route path="/" element={<PadiV3placa2 />} />
      </Routes>
    </div>
  );
}

export default App;
