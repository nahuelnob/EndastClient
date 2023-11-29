import React, { useState } from "react";
import mqtt from "mqtt";
import style from "./Out2.module.css";
const TOPIC = "64c314be56857449102a9d4b/testid/7AJDDkZVrj/actdata";
const HOST = "192.168.0.46";

const Out2 = () => {
  const [switcher, setSwitcher] = useState(false);
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
      <h2>out2</h2>
      <section className={style.luces}>
        <div
          className={style.prendido}
          style={{
            backgroundColor: `${switcher ? "green" : "rgb(46,104,46)"}`,
            filter: `${switcher ? "drop-shadow(0px 0px 5px green)" : "none"}`,
          }}
        ></div>
        <div
          className={style.apagado}
          style={{
            backgroundColor: `${switcher ? "rgb(219,51,51)" : "red"}`,
            filter: `${switcher ? "none" : "drop-shadow(0px 0px 5px red)"}`,
          }}
        ></div>
      </section>

      <section className={style.switch}>
        <button
          onClick={handlerSwitch}
          className={style.bola}
          style={{
            transform: `${switcher ? "translateX(-4rem)" : "translateX(0rem)"}`,
          }}
        ></button>
      </section>
    </div>
  );
};

export default Out2;
