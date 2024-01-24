import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router";
import "./App.css";
import Landing from "./Components/Landing/Landing";
import { addPlacas } from "./Redux/actions";
import PadiV3 from "./views/PadiV3/PadiV3";

function App() {
  const HOST = "192.168.0.46";
  const dispatch = useDispatch()
  const placas = useSelector((state) => state.placas)

  useEffect(() => {
    dispatch(addPlacas())
  }, [])

  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />;
        {placas &&
          placas.map((pl) => {
            const { dId, topic } = pl;
            return (
              <Route path={`/${dId}`} element={<PadiV3 topic={topic} host={HOST} />} />
            );
          })}
      </Routes>
    </div>
  );
}

export default App;
