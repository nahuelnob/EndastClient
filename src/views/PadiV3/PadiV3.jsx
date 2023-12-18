import Dashboard from "../Dashboard/Dashboard";
import Banner from "../../Components/Banner/Banner";
import NavBar from "../../Components/NavBar/NavBar";
import style from './PadiV3.module.css'

const PadiV3 = ({topic}) => {
  return (
    <div className={style.container}>
      <section className={style.Banner}>
        <Banner />
      </section>
      <section>
        <NavBar/>
        <Dashboard topic={topic}/>
      </section>
    </div>
  );
};

export default PadiV3;
