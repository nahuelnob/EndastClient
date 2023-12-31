import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import React, { useEffect, useState } from "react";
import mqtt from "mqtt";
import style from "./Ain2.module.css";
import { editAin2 } from "../../Redux/actions";
// const dId = 'testid'
// const TOPIC = `64c314be56857449102a9d4b/${dId}/AM8p6BX0gm/sdata`;
const HOST = "192.168.0.46";

const Ain2 = ({ topic, client }) => {
  const TOPIC = `${topic}AM8p6BX0gm/sdata`;
  const dId = topic.split("/")[1];
  const dispatch = useDispatch();
  const ain2 = useSelector((state) => state.ain2);

  const [name, setName] = useState("ain2");
  const [configName, setConfigName] = useState(false);

  const handlerName = (e) => {
    setName(e.target.value);
  };

  const handlerConfigName = () => {
    !configName && setConfigName(true);
    configName && setConfigName(false);
  };

  const porcentaje = Math.round((Number(ain2) * 100) / 4095);

  useEffect(() => {
    const client = mqtt.connect(`ws://${HOST}:8083/mqtt`);

    const post = async (value) => {
      try {
        const { data } = await axios.post(
          `http://${HOST}:3001/api/ain2`,
          value
        );
      } catch (error) {
        window.alert(error);
      }
    };

    client.on("connect", () => {
      // console.log("Conectado al broker MQTT");

      // Suscripcion al topico
      client.subscribe(TOPIC, (err) => {
        if (err) console.log(`Error al suscribirse a: ${TOPIC}`);
      });
    });

    // Manejo de mensajes recibidos
    client.on("message", (topic, message) => {
      const match = message.toString().match(/\d+/);
      if (match) {
        let porcent = Math.round((Number(match[0]) * 100) / 4095);

        dispatch(editAin2(match[0]));
        post({ value: match[0], porcentaje: porcent, placa: dId });
      }
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
      <div className={style.main}>
        <section className={style.porcentaje}>
          <h1 className={style.porc}>{porcentaje}%</h1>
        </section>
        <section className={style.fondoBarra}>
          <div
            className={style.barra}
            style={{
              width: `${porcentaje}%`,
              backgroundColor: `${
                porcentaje > 25 && porcentaje < 75
                  ? "rgb(255,255,84)"
                  : porcentaje > 75
                  ? "rgb(219,51,51)"
                  : "rgb(46,104,46)"
              }`,
            }}
          ></div>
        </section>
        {/* <section className={style.variacion}>Variacion</section> */}
      </div>
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
      </div>
    </div>
  );
};

export default Ain2;
