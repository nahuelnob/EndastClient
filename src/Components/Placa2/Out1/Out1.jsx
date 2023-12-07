import React, { useState } from "react";
import mqtt from "mqtt";
import style from "./Out1.module.css";
const dId = "testid2";
const HOST = "192.168.0.46";
const TOPIC = `64c314be56857449102a9d4b/${dId}/uX0NxQhNrr/actdata`;

const Out1 = () => {
  const [switcher, setSwitcher] = useState(false);
  const [name, setName] = useState("out1");
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
    // console.log("Conectado al broker MQTT");
    // Suscripcion al topico
    client.subscribe(TOPIC, (err) => {
      if (!err) {
        // console.log(`Suscrito al tema: ${TOPIC}`);
      } else {
        console.log(`Error al suscribirse a:  ${TOPIC}`);
      }
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
      <header className={style.titulo}>
        <p style={{ marginLeft: "1rem" }}> {name}</p>
        <button
          className={style.buttonConfig}
          onClick={() => handlerConfigName()}
        >
          <img src="../../public/gear-solid.svg" alt="" />
        </button>
      </header>
      <section className={style.luces}>
        <div
          className={style.apagado}
          style={{
            backgroundColor: `${switcher ? "rgb(219,51,51)" : "red"}`,
            filter: `${switcher ? "none" : "drop-shadow(0px 0px 5px red)"}`,
          }}
        ></div>
        <div
          className={style.prendido}
          style={{
            backgroundColor: `${
              switcher ? "rgb(34, 163, 34)" : "rgb(46,104,46)"
            }`,
            filter: `${
              switcher ? "drop-shadow(0px 0px 5px rgb(46,104,46))" : "none"
            }`,
          }}
        ></div>
      </section>
      <section className={style.switchDiv}>
        <div className={style.switch}>
          <button
            onClick={handlerSwitch}
            className={style.bola}
            style={{
              transform: `${
                switcher ? "translateX(0rem)" : "translateX(-4rem)"
              }`,
            }}
          ></button>
        </div>
      </section>
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
        <button
          className={style.cerrar}
          onClick={() => handlerConfigName()}
        >
          {" "}
          x{" "}
        </button>
      </div>
    </div>
  );
};

export default Out1;
