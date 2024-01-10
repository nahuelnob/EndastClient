import Dashboard from "../Dashboard/Dashboard";
import NavBar from "../../Components/NavBar/NavBar";
import Banner from "../../Components/Banner/Banner";
import style from './PadiV3.module.css'

const PadiV3 = ({ topic }) => {
  return (
    <div className={style.container}>
      <header style={{ position: "absolute", width: "100%", height: "10vh", overflow: "hidden", zIndex: "-1" }}>
        <Banner />
      </header>
      <nav className={style.NavBar}>
        <NavBar />
      </nav>
      <main className={style.Dashboard}>
        <Dashboard topic={topic} />
      </main>
    </div>
  );
};

export default PadiV3;
