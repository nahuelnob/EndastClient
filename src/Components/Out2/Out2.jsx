import React from "react";
import mqtt from "mqtt";
const TOPIC = "64c314be56857449102a9d4b/testid/7AJDDkZVrj/actdata";
const HOST = "192.168.0.46";

const Out2 = () => {
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

  const prender = (mensaje) => {
    client.publish(TOPIC, mensaje, (error) => {
      if (error) console.error(error);
      console.log(`${mensaje} publicado`);
    });
  };
  const apagar = (mensaje) => {
    client.publish(TOPIC, mensaje, (error) => {
      if (error) console.error(error);
      console.log(`${mensaje} publicado`);
    });
  };

  return (
    <div>
      <button onClick={() => prender("{value : true}")}>On</button>
      <button onClick={() => apagar("{value : false}")}>Off</button>
    </div>
  );
};

export default Out2;