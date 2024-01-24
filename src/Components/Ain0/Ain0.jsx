import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import React, { useEffect, useState } from "react";
import mqtt from "mqtt";
import { editAin0 } from "../../Redux/actions";
import style from "./Ain0.module.css";
// const dId = "testid";
// const TOPIC = `64c314be56857449102a9d4b/${dId}/NrFMgh03GO/sdata`;
const HOST = "192.168.0.46";

const Ain0 = ({ topic, client }) => {

  const TOPIC = `${topic}NrFMgh03GO/sdata`;
  const dId = topic.split("/")[1];
  
  const dispatch = useDispatch();
  const ain0 = useSelector((state) => state.ain0);
  const [name, setName] = useState("ain0");
  const [configName, setConfigName] = useState(false);
  
  const handlerName = (e) => {
    setName(e.target.value);
  };
  
  console.log(ain0);
  const handlerConfigName = () => {
    !configName && setConfigName(true);
    configName && setConfigName(false);
  };

  const porcentaje = Math.round((Number(ain0[dId]) * 100) / 4095);
  /////////////////////////////////////////////////////////////////
  const strokeWidth = 20;
  const radius = 65 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (porcentaje / 100) * circumference;
  /////////////////////////////////////////////////////////////////

  useEffect(() => {
    const client = mqtt.connect(`ws://${HOST}:8083/mqtt`);

    const post = async (value) => {
      try {
        const { data } = await axios.post(
          `http://${HOST}:3001/api/ain0`,
          value
        );
      } catch (error) {
        window.alert(error);
      }
    };

    client.on("connect", () => {
      client.subscribe(TOPIC, (err) => {
        if (err) console.log(`Error al suscribirse a: ${TOPIC}`);
      });
    });

    // Manejo de mensajes recibidos
    client.on("message", (topic, message) => {
      const match = message.toString().match(/\d+/);
      if (match) {
        let porcent = Math.round((Number(match[0]) * 100) / 4095);
        dispatch(editAin0(match[0], dId));
        post({ value: match[0], porcentaje: porcent, placa: dId });
        // console.log(
        //   `Mensaje recibido en el tema ${topic}: ${message.toString()}`
        // );
      }
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
        <section className={style.radial}>
          <svg className={style.radialprogress}>
            <circle
              className={style.radialprogressbackground}
              cx="150"
              cy="75"
              r={radius}
              strokeWidth={strokeWidth}
            />
            <circle
              className={style.radialprogressbar}
              cx="150"
              cy="75"
              r={radius}
              strokeWidth={strokeWidth}

              style={{
                strokeDasharray: `${circumference} ${circumference}`, strokeDashoffset: offset, stroke: `${porcentaje > 25 && porcentaje < 75
                  ? "rgb(255,255,84)"
                  : porcentaje > 75
                    ? "rgb(219,51,51)"
                    : "rgb(46,104,46)"
                  }`
              }}
            />
          </svg>
          <article className={style.porcentaje}>
            <h1 className={style.porc}>{porcentaje}%</h1>
          </article>
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

export default Ain0;
