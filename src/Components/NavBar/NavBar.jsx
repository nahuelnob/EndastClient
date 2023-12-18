import style from "./NavBar.module.css";
import { NavLink } from "react-router-dom";
const NavBar = () => {
  return (
    <nav className={style.container}>
      <section>
        <img className={style.iso} src="../../public/iso.png" alt="" />
        <h3>Padi v3</h3>
      </section>
      <section>
        <NavLink to="/testid">
          <button className={style.link}>testid</button>
        </NavLink>
        <NavLink to="/testid2">
          <button className={style.link}>testid2</button>
        </NavLink>
      </section>
    </nav>
  );
};

export default NavBar;
