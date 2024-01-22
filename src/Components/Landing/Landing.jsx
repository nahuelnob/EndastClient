import { NavLink, useNavigate } from "react-router-dom";
import style from "./Landing.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPlacas } from "../../Redux/actions";

const Landing = () => {
  const placas = useSelector((state) => state.placas);
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
    if (user === usuario && pass === password) {
      setAccess(true);
    }
  };

  return (
    <div className={style.container}>
      <main className={style.brand} />

      <main className={style.main}>
        <header className={style.logo}>
          <img className={style.iso} src="/negro.png" alt="" />
          <div className={style.hr}></div>
        </header>

        <section className={style.form}>
          <p className={!access ? style.etiquetaUs : style.eti}>Usuario</p>
          <input
            className={style.input}
            type="text"
            autocomplete="off"
            name="usuario"
            value={userData.usuario}
            onChange={handleChange}
          />
          <p className={!access ? style.etiquetaCon : style.eti}>Contraseña</p>
          <input
            className={style.input}
            type="password"
            autocomplete="off"
            name="password"
            value={userData.password}
            onChange={handleChange}
          />
          <button
            className={style.boton}
            onClick={() => handlerAccess(userData.usuario, userData.password)}
          >
            Entrar
          </button>
          {/* </section> */}
        </section>
      </main>
      <section className={access && style.popup}>
        {access ? (placas.length === 0 && <div className={style.noPlacas}><h3> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M96 0C78.3 0 64 14.3 64 32v96h64V32c0-17.7-14.3-32-32-32zM288 0c-17.7 0-32 14.3-32 32v96h64V32c0-17.7-14.3-32-32-32zM32 160c-17.7 0-32 14.3-32 32s14.3 32 32 32v32c0 77.4 55 142 128 156.8V480c0 17.7 14.3 32 32 32s32-14.3 32-32V412.8c12.3-2.5 24.1-6.4 35.1-11.5c-2.1-10.8-3.1-21.9-3.1-33.3c0-80.3 53.8-148 127.3-169.2c.5-2.2 .7-4.5 .7-6.8c0-17.7-14.3-32-32-32H32zM432 512a144 144 0 1 0 0-288 144 144 0 1 0 0 288zm59.3-180.7L454.6 368l36.7 36.7c6.2 6.2 6.2 16.4 0 22.6s-16.4 6.2-22.6 0L432 390.6l-36.7 36.7c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6L409.4 368l-36.7-36.7c-6.2-6.2-6.2-16.4 0-22.6s16.4-6.2 22.6 0L432 345.4l36.7-36.7c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z" fill="#303030" /></svg>No hay placas instaladas...</h3><button className={style.close} onClick={()=>setAccess(false)}>x</button></div>) || (
          placas.map((pl, index) => {
            const { dId, topic } = pl;
            return (
              <NavLink
                to={`/${dId}`}
                style={{ textDecoration: "none", color: "white" }}
              >
                <div className={style.placas}>
                  <img className={style.iso} src="/isoNegro.png" alt="" width={"70vh"} />
                  <div className={style.hr2}></div>
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
