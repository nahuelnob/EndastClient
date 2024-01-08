import Dashboard from "../Dashboard/Dashboard";
import NavBar from "../../Components/NavBar/NavBar";
import style from './PadiV3.module.css'

const PadiV3 = ({ topic }) => {
  return (
    <div className={style.container}>
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
