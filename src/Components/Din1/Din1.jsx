import { useDispatch, useSelector } from "react-redux";
import { editDin1 } from "../../Redux/actions";
import React, { useEffect } from "react";
import mqtt from "mqtt";
import style from "./Din1.module.css";
const TOPIC = "64c314be56857449102a9d4b/testid/O2RMRlSUYU/sdata";
const HOST = "192.168.0.46";

const Din1 = () => {
  const dispatch = useDispatch();
  const din1 = useSelector((state) => state.din1);
  // Busca el numero del mensaje
  var match = din1.match(/\d+/);

  const porcentaje = Math.round((Number(match[0]) * 100) / 4095);

  useEffect(() => {
    const client = mqtt.connect(`ws://${HOST}:8083/mqtt`);

    client.on("connect", () => {
      console.log("Conectado al broker MQTT");

      // Suscripcion al topico
      client.subscribe(TOPIC, (err) => {
        if (!err) {
          console.log(`Suscrito al tema: ${TOPIC}`);
        }
      });
    });

    // Manejo de mensajes recibidos
    client.on("message", (topic, message) => {
      dispatch(editDin1(message.toString()));
      console.log(
        `Mensaje recibido en el tema ${topic}: ${message.toString()}`
      );
    });
  }, []); // El segundo parámetro [] asegura que este efecto se ejecute solo una vez al montar el componente

  return (
    <div className={style.container}>
      {din1}
      <div className={style.fondo}>
        <div className={style.barra} style={{ width: `${porcentaje}%`, backgroundColor:`${porcentaje > 25 && porcentaje < 75 ? "yellow" : porcentaje > 75 ? "red" : "green"}` }}></div>
      </div>
      <div className={style.progres}>{porcentaje}%</div>
    </div>
  );
};

export default Din1;
