import { useDispatch, useSelector } from "react-redux";
// import { editUserRedux } from "../../Redux/actions";
import React, { useEffect } from "react";
import mqtt from "mqtt";
import { editAin1 } from "../../Redux/actions";
const TOPIC = "64c314be56857449102a9d4b/testid/iSK4MVs6tO/sdata";
const HOST = "192.168.0.46";

const Ain1 = () => {
  const dispatch = useDispatch();
  const ain1 = useSelector((state) => state.ain1);

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
      dispatch(editAin1(message.toString()));
      console.log(
        `Mensaje recibido en el tema ${topic}: ${message.toString()}`
      );
    });
  }, []); // El segundo parámetro [] asegura que este efecto se ejecute solo una vez al montar el componente

  return <div>{ain1}</div>;
};

export default Ain1;
