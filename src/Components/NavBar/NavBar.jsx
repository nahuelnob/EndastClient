import style from "./NavBar.module.css";
import { NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
const NavBar = () => {
  const location = useLocation()
  console.log(location.pathname);
  const placas = useSelector((state) => state.placas);
  return (
    <nav className={style.container}>
      <section className={style.logo}>
        <img className={style.iso} src="../../public/iso.png" alt="" />
        <p className={style.padi}>Padi</p>
      </section>
      <section className={style.links}>
        {placas.map((pl, index) => {
          const { dId, topic } = pl;
          return (
            <NavLink
              to={`/${dId}`}
              style={{ textDecoration: "none", color: "white" }}
            >
              <div className={style.placas}>
               {location.pathname === `/${dId}` ? <button className={style.linkActive}>{dId}</button> : <button className={style.link}>{dId}</button>}
              </div>
            </NavLink>
          );
        })}
      </section>
      <footer className={style.footer}>
        <p>v3.0.1</p>
      </footer>
    </nav>
  );
};

export default NavBar;
