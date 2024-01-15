import React, { useState } from "react";
import mqtt from "mqtt";
import style from "./Out0.module.css";
// const dId = "testid";
// const TOPIC = `64c314be56857449102a9d4b/${dId}/inLngKM48P/actdata`;
const HOST = "192.168.0.46";

const Out0 = ({ topic }) => {
  const TOPIC = `${topic}inLngKM48P/actdata`;
  const dId = topic.split("/")[1];

  const [switcher, setSwitcher] = useState(false);
  const [name, setName] = useState("out0");
  const [configName, setConfigName] = useState(false);

  const handlerName = (e) => {
    setName(e.target.value);
  };

  const handlerConfigName = () => {
    !configName && setConfigName(true);
    configName && setConfigName(false);
  };

  const client = mqtt.connect(`ws://${HOST}:8083/mqtt`);

  client.on("connect", () => {
    // Suscripcion al topico
    client.subscribe(TOPIC, (err) => {
      if (err) console.log(`Error al suscribirse a:  ${TOPIC}`);
    });
  });

  const handlerSwitch = () => {
    if (switcher) {
      setSwitcher(false),
        client.publish(TOPIC, "{value:false}", (error) => {
          if (error) console.error(error);
        });
    } else {
      setSwitcher(true),
        client.publish(TOPIC, "{value:true}", (error) => {
          if (error) console.error(error);
        });
    }
  };

  return (
    <div className={style.container}>
      <header className={style.header}>
        <button
          className={style.buttonConfig}
          onClick={() => handlerConfigName()}
        >
          <img src="../../public/gear-solid.svg" alt="" />
        </button>
      </header>
      <main className={style.main}>
        {switcher ?
          <section className={style.encendido}>
            {/* <div className={style.luzVerde}></div> */}
            {" "}{/* Encendido */} |
          </section> :
          <section className={style.apagado}>{/* <div className={style.luzRoja}></div> */}{" "}{/* Apagado */} 0</section>}



        {/* <section
          className={style.luzRoja}
          style={{
            backgroundColor: `${switcher ? "rgb(219,51,51)" : "red"}`,
            filter: `${switcher ? "none" : "drop-shadow(0px 0px 5px red)"}`,
          }}
        >Apagado</section>
        <section
          className={style.luzVerde}
          style={{
            backgroundColor: `${switcher ? "rgb(34, 163, 34)" : "#2e682e"
              }`,
            filter: `${switcher ? "drop-shadow(0px 0px 5px rgb(46,104,46))" : "none"
              }`,
          }}
        >Encendido</section> */}
        <section className={style.switchDiv}>
          <div className={style.switch}>
            <button
              onClick={handlerSwitch}
              className={style.bola}
              style={{
                transform: `${switcher ? "translateX(0.5rem)" : "translateX(-3.1rem)"
                  } translateY(-0.1rem)`, background: `${switcher ? "#0cfc0c" : "#fc0c0c"}`, boxShadow: `${switcher ? "inset 0 0 15px #0b570b" : "inset 0 0 15px #680d0d"}`
              }}
            ></button>
          </div>
        </section>
      </main>
      <footer className={style.footer}>
        <h3>{name}</h3>
      </footer>

      <div
        className={style.inputDiv}
        style={{ display: `${configName ? "flex" : "none"}` }}
      >
        <h4>Nombre: </h4>
        <input
          className={style.input}
          type="text"
          name="name"
          value={name}
          onChange={handlerName}
        />
        <button
          className={style.botonCambiar}
          onClick={() => handlerConfigName()}
        >
          {" "}
          Cambiar{" "}
        </button>
        <button className={style.close} onClick={() => setConfigName(false)}>x</button>

      </div>
    </div>
  );
};

export default Out0;
