import { useDispatch, useSelector } from "react-redux";
import { editDin3 } from "../../Redux/actions";
import React, { useEffect, useState } from "react";
import mqtt from "mqtt";
import style from "./Din3.module.css";
const HOST = "192.168.0.46";

const Din3 = ({ topic }) => {
  const TOPIC = `${topic}9UaEQR4I36/sdata`;
  const dId = topic.split("/")[1];

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
      // Suscripcion al topico
      client.subscribe(TOPIC, (err) => {
        if (err) console.log(`Error al suscribirse a: ${TOPIC}`);
      });
    });

    // Manejo de mensajes recibidos
    client.on("message", (topic, message) => {
      const match = message.toString().match(/\d+/);
      match[0] === "1" ? dispatch(editDin3(true)) : dispatch(editDin3(false));
    });
  }, []); // El segundo parámetro [] asegura que este efecto se ejecute solo una vez al montar el componente

  return (
    <div className={style.container}>
      <header className={style.header}>
        <button
          className={style.buttonConfig}
          onClick={() => handlerConfigName()}
        >
          <img src="/gear-solid.svg" alt="" />
        </button>
      </header>
      <main className={style.main}>
      {din3[dId] ?
         <section className={style.encendido}>
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={{ width: "4vh", filter:"saturate(350%)", filter:"drop-shadow(0px 0px 3px #63dcec)"}}><path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V256c0 17.7 14.3 32 32 32s32-14.3 32-32V32zM143.5 120.6c13.6-11.3 15.4-31.5 4.1-45.1s-31.5-15.4-45.1-4.1C49.7 115.4 16 181.8 16 256c0 132.5 107.5 240 240 240s240-107.5 240-240c0-74.2-33.8-140.6-86.6-184.6c-13.6-11.3-33.8-9.4-45.1 4.1s-9.4 33.8 4.1 45.1c38.9 32.3 63.5 81 63.5 135.4c0 97.2-78.8 176-176 176s-176-78.8-176-176c0-54.4 24.7-103.1 63.5-135.4z" fill="#63dcec" /></svg><span style={{position:"absolute", left:"5vh"}}>On</span>
       </section> :
       <section className={style.apagado}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={{ width: "4vh", filter:"saturate(350%)", filter:"drop-shadow(0px 0px 3px #202020)"}}><path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V256c0 17.7 14.3 32 32 32s32-14.3 32-32V32zM143.5 120.6c13.6-11.3 15.4-31.5 4.1-45.1s-31.5-15.4-45.1-4.1C49.7 115.4 16 181.8 16 256c0 132.5 107.5 240 240 240s240-107.5 240-240c0-74.2-33.8-140.6-86.6-184.6c-13.6-11.3-33.8-9.4-45.1 4.1s-9.4 33.8 4.1 45.1c38.9 32.3 63.5 81 63.5 135.4c0 97.2-78.8 176-176 176s-176-78.8-176-176c0-54.4 24.7-103.1 63.5-135.4z" fill="#303030" /></svg><span style={{position:"absolute", left:"5vh"}}>Off</span></section>}
      </main>
      <footer className={style.footer}>
        <h3 className={style.titulo}>{name}</h3>
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
export default Din3;
