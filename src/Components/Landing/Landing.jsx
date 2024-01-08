import { NavLink, useNavigate } from "react-router-dom";
import style from "./Landing.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPlacas } from "../../Redux/actions";

const Landing = () => {
  const dispatch = useDispatch();
  const placas = useSelector((state) => state.placas);
  const navigate = useNavigate();
  const [access, setAccess] = useState(false);
  const [userData, setUserdata] = useState({
    usuario: "",
    password: "",
  });

  const usuario = "Nahue";
  const password = "nnob1974";

  const handleChange = (e) => {
    setUserdata({ ...userData, [e.target.name]: e.target.value });
  };

  const handlerAccess = (user, pass) => {
    user !== usuario && window.alert("Usuario incorrecto");
    pass !== password && window.alert("Contraseña incorrecta");
    user === usuario &&
      pass === password &&
      dispatch(addPlacas()) &&
      setAccess(true);
  };

  return (
    <div className={style.container}>
      <div className={style.content}>
        <header className={style.header}>
          <img className={style.logo} src="/blanco.png" alt="" />
          <hr className={style.hr} />
        </header>
        <main className={style.main}>
          <section className={style.section}>
            <p className={style.etiqueta}>Usuario</p>
            <input
              className={style.input}
              type="text"
              autocomplete="off"
              name="usuario"
              value={userData.usuario}
              onChange={handleChange}
            />
          </section>
          <section className={style.section}>
            <p className={style.etiqueta}>Contraseña</p>
            <input
              className={style.input}
              type="password"
              autocomplete="off"
              name="password"
              value={userData.password}
              onChange={handleChange}
            />
          </section>
          <section className={style.section}>
            {/* <NavLink to="/testid2"> */}
            <button
              className={style.boton}
              onClick={() => handlerAccess(userData.usuario, userData.password)}
            >
              Entrar
            </button>
            {/* </NavLink> */}
          </section>
        </main>
      </div>
      <section className={access && style.popup}>
        {access ? (
          placas.map((pl, index) => {
            const { dId, topic } = pl;
            return (
              <NavLink
                to={`/${dId}`}
                style={{ textDecoration: "none", color: "white" }}
              >
                <div className={style.placas}>
                  <img src="/iso.png" alt="" width={"100vh"} />
                  <h1 className={style.link}>{dId}</h1>
                </div>
              </NavLink>
            );
          })
        ) : (
          <div style={{ display: "none" }}></div>
        )}
      </section>
    </div>
  );
};

export default Landing;
