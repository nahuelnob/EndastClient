import Dashboard from "../Dashboard2/Dashboard2";
import Banner from "../../Components/Banner/Banner";
import NavBar from "../../Components/NavBar/NavBar";
import style from './PadiV3.module.css'

const PadiV3placa2 = () => {
  return (
    <div className={style.container}>
      <section className={style.Banner}>
        <Banner />
      </section>
      <section>
        {/* <NavBar/> */}
        <Dashboard />
      </section>
    </div>
  );
};

export default PadiV3placa2;
