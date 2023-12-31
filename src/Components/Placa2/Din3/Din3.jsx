import { useDispatch, useSelector } from "react-redux";
import { editDin3 } from "../../../Redux/actions";
import React, { useEffect, useState } from "react";
import mqtt from "mqtt";
import style from "./Din3.module.css";
const dId = "testid2";
const TOPIC = `64c314be56857449102a9d4b/${dId}/9UaEQR4I36/sdata`;
const HOST = "192.168.0.46";

const Din3 = () => {
  const dispatch = useDispatch();
  const din3 = useSelector((state) => state.din3);

  const [name, setName] = useState("din3");
  const [configName, setConfigName] = useState(false);

  const handlerName = (e) => {
    setName(e.target.value);
  };

  const handlerConfigName = () => {
    !configName && setConfigName(true);
    configName && setConfigName(false);
  };

  useEffect(() => {
    const client = mqtt.connect(`ws://${HOST}:8083/mqtt`);

    client.on("connect", () => {
      // console.log("Conectado al broker MQTT");

      // Suscripcion al topico
      client.subscribe(TOPIC, (err) => {
        if (!err) {
          // console.log(`Suscrito al tema: ${TOPIC}`);
        } else {
          console.log(`Error al suscribirse a: ${TOPIC}`);
        }
      });
    });

    // Manejo de mensajes recibidos
    client.on("message", (topic, message) => {
      console.log(
        `Mensaje recibido en el tema ${topic}: ${message.toString()}`
      );
      const match = message.toString().match(/\d+/);
      match[0] === "1" ? dispatch(editDin3(true)) : dispatch(editDin3(false));
    });
  }, []); // El segundo parámetro [] asegura que este efecto se ejecute solo una vez al montar el componente

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
        <h1 style={{color:`${din3 ? "rgb(46,104,46)" : "rgb(219,51,51)"}`, transition:"ease-in-out 0.3s"}}> {din3 ? "Prendido" : "Apagado"}</h1>
      <section className={style.luces}>
        <div
          className={style.apagado}
          style={{
            backgroundColor: `${din3 ? "rgb(219,51,51)" : "red"}`,
            filter: `${din3 ? "none" : "drop-shadow(0px 0px 5px red)"}`,
          }}
        ></div>
        <div
          className={style.prendido}
          style={{
            backgroundColor: `${din3 ? "rgb(34, 163, 34)" : "rgb(46,104,46)"}`,
            filter: `${
              din3 ? "drop-shadow(0px 0px 5px rgb(46,104,46))" : "none"
            }`,
          }}
        ></div>
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

export default Din3;
