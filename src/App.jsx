import "./App.css";
import PadiV3 from "./views/PadiV3/PadiV3";
import { Route, Routes } from "react-router";
import PadiV3placa2 from "./views/PadiV3/PadiV3placa2";
import { useEffect, useState } from "react";
import axios from "axios";
import Landing from "./Components/Landing/Landing";
import { useSelector } from "react-redux";

// function App() {
//   return (
//     <div>
//       <Routes>
//         {/* <Route path="/1" element={<PadiV3 />} /> */}
//         <Route path="/" element={<PadiV3placa2 />} />
//       </Routes>
//     </div>
//   );
// }

//* Nueva funcion App

function App() {
  const placas = useSelector((state) => state.placas)
  console.log(placas);
  // const [placa, setPlaca] = useState(null);

  // useEffect(() => {
  //   const placas = async () => {
  //     try {
  //       const { data } = await axios(
  //         "http://192.168.0.46:3001/api/getdevicecredentials"
  //       );
  //       setPlaca(data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   placas();
  // }, []);
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />;
        {placas &&
          placas.map((pl) => {
            const { dId, topic } = pl;
            return (
              <Route path={`/${dId}`} element={<PadiV3 topic={topic} />} />
            );
          })}
      </Routes>
    </div>
  );
}

export default App;
