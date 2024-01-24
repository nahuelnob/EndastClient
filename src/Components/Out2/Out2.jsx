import React, { useState } from "react";
import mqtt from "mqtt";
import style from "./Out2.module.css";
// const dId = "testid";
// const TOPIC = `64c314be56857449102a9d4b/${dId}/7AJDDkZVrj/actdata`;
const HOST = "192.168.0.46";

const Out2 = ({topic}) => {
  const TOPIC = `${topic}7AJDDkZVrj/actdata`;
  const dId = topic.split('/')[1]
  
  const [switcher, setSwitcher] = useState(false);
  const [name, setName] = useState("out2");
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
          <img src="gear-solid.svg" alt="" />
        </button>
      </header>
      <main className={style.main}>
        {switcher ?
          <section className={style.encendido}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={{ border: "solid 2px #63dcec", padding: "5px", marginBottom: "-3vh", borderRadius: "100%", width: "7vh", filter: "drop-shadow(0px 0px 15px #63dcec) saturate(150%)", boxShadow: "0px 0px 10px 0px #63dcec" }}><path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V256c0 17.7 14.3 32 32 32s32-14.3 32-32V32zM143.5 120.6c13.6-11.3 15.4-31.5 4.1-45.1s-31.5-15.4-45.1-4.1C49.7 115.4 16 181.8 16 256c0 132.5 107.5 240 240 240s240-107.5 240-240c0-74.2-33.8-140.6-86.6-184.6c-13.6-11.3-33.8-9.4-45.1 4.1s-9.4 33.8 4.1 45.1c38.9 32.3 63.5 81 63.5 135.4c0 97.2-78.8 176-176 176s-176-78.8-176-176c0-54.4 24.7-103.1 63.5-135.4z" fill="#63dcec" /></svg>
          </section> :
          <section className={style.apagado}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={{ border: "solid 2px #909090", padding: "5px", marginBottom: "-3vh", borderRadius: "100%", width: "7vh", boxShadow: "0px 0px 10px 0px #909090" }}><path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V256c0 17.7 14.3 32 32 32s32-14.3 32-32V32zM143.5 120.6c13.6-11.3 15.4-31.5 4.1-45.1s-31.5-15.4-45.1-4.1C49.7 115.4 16 181.8 16 256c0 132.5 107.5 240 240 240s240-107.5 240-240c0-74.2-33.8-140.6-86.6-184.6c-13.6-11.3-33.8-9.4-45.1 4.1s-9.4 33.8 4.1 45.1c38.9 32.3 63.5 81 63.5 135.4c0 97.2-78.8 176-176 176s-176-78.8-176-176c0-54.4 24.7-103.1 63.5-135.4z" fill="#909090" /></svg></section>}
        <section className={style.switchDiv}>
          <div className={style.switch} style={{
            background: `${switcher ? "#63dcec" : "#909090"
              }`,
            boxShadow: `${switcher ? "inset 0px 0px 10px 0px #1e6d77" : "inset 0px 0px 10px 0px #909090"}`
          }}>
            <button
              onClick={handlerSwitch}
              className={style.bola}
              style={{
                transform: `${switcher ? "translateX(-0.05rem)" : "translateX(-4rem)"
                  }`
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

export default Out2;
