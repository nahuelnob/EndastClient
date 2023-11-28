import { useDispatch, useSelector } from "react-redux";
import { editDin0 } from "../../Redux/actions";
import React, { useEffect } from "react";
import mqtt from "mqtt";
const TOPIC = "64c314be56857449102a9d4b/testid/aPtCeiVxcp/sdata";
const HOST = "192.168.0.46";

const Din0 = () => {
  const dispatch = useDispatch();
  const din0 = useSelector((state) => state.din0);

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
      dispatch(editDin0(message.toString()));
      console.log(
        `Mensaje recibido en el tema ${topic}: ${message.toString()}`
      );
    });
  }, []); // El segundo parámetro [] asegura que este efecto se ejecute solo una vez al montar el componente

  return <div>{din0}</div>;
};

export default Din0;
