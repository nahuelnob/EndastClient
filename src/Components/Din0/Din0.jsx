import { useDispatch, useSelector } from "react-redux";
import { editDin0 } from "../../Redux/actions";
import React, { useEffect, useState } from "react";
import mqtt from "mqtt";
import style from "./Din0.module.css";
const TOPIC = "64c314be56857449102a9d4b/testid/aPtCeiVxcp/sdata";
const HOST = "192.168.0.46";

const Din0 = () => {
  const dispatch = useDispatch();
  const din0 = useSelector((state) => state.din0);
  const [name, setName] = useState("din0");
  const [configName, setConfigName] = useState(false);

  const handlerName = (e) => {
    setName(e.target.value);
  };

  const handlerConfigName = () => {
    !configName && setConfigName(true);
    configName && setConfigName(false);
  };

  // Busca el numero dentro del mensaje
  var match = din0.match(/\d+/);

  const porcentaje = Math.round((Number(match[0]) * 100) / 4095);

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
      dispatch(editDin0(message.toString()));
      console.log(
        `Mensaje recibido en el tema ${topic}: ${message.toString()}`
      );
    });
  }, []); // El segundo parámetro [] asegura que este efecto se ejecute solo una vez al montar el componente
  {
  }

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
      {/* {`value : ${match}`} */}
      <section className={style.porcentaje}>
        <h1 className={style.porc}>{porcentaje}%</h1>
      </section>
      <div className={style.fondoBarra}>
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
      </div>
      <section className={style.variacion}></section>
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

export default Din0;
