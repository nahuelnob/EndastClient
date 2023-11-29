/* const HOST = "192.168.0.46";
import mqtt from "mqtt";
// const TOPIC = "64c314be56857449102a9d4b/testid/NrFMgh03GO/sdata";
const TOPIC = "64c314be56857449102a9d4b/testid/inLngKM48P/actdata";

export const prender = () => {
  const client = mqtt.connect(`mqtt://${HOST}/mqtt`);
  client.on("connect", () => {
    console.log("Conectado al broker MQTT");

    // Suscribirse a los topicos
    client.subscribe(TOPIC, (error) => {
      if (error) {
        console.error(`Error al suscribirse a ${TOPIC}:`, error);
      } else {
        console.log(`Suscrito a ${TOPIC}`);
      }
    });
  });

  // Publicar un mensaje después de conectarse
  const mensaje = "{'value': 'true'}";
  client.publish(TOPIC, mensaje, (error) => {
    if (error) {
      console.error(`Error al publicar en ${TOPIC}:`, error);
    } else {
      console.log(`Mensaje publicado en ${TOPIC}: ${mensaje}`);
    }
  });
};

export const apagar = () => {
  const client = mqtt.connect(`mqtt://${HOST}/mqtt`);
  client.on("connect", () => {
    console.log("Conectado al broker MQTT");

    // Suscribirse a los topicos
    client.subscribe(TOPIC, (error) => {
      if (error) {
        console.error(`Error al suscribirse a ${TOPIC}:`, error);
      } else {
        console.log(`Suscrito a ${TOPIC}`);
      }
    });
  });

  // Publicar un mensaje después de conectarse
  const mensaje = "{'value': 'false'}";
  client.publish(TOPIC, mensaje, (error) => {
    if (error) {
      console.error(`Error al publicar en ${TOPIC}:`, error);
    } else {
      console.log(`Mensaje publicado en ${TOPIC}: ${mensaje}`);
    }
  });
};

apagar() */

useEffect(() => {
  const client = mqtt.connect("ws://192.168.0.46:8083/mqtt");

  client.on("connect", () => {
    console.log("Conectado al broker MQTT");

    // Puedes suscribirte a un tema después de la conexión
    client.subscribe(TOPIC, (err) => {
      if (!err) {
        console.log(`Suscrito al tema: ${TOPIC}`);
      }
    });
  });

  // Maneja los mensajes recibidos
  client.on("message", (topic, message) => {
    dispatch(editUserRedux(message.toString()));
    console.log(
      `Mensaje recibido en el tema ${topic}: ${message.toString()}`
    );
  });

  // Devuelve una función de limpieza para desconectar el cliente cuando el componente se desmonta
  // return () => {
  //   client.end();
  //   console.log("Desconectado del broker MQTT");
  // };
}, []); // El segundo parámetro [] asegura que este efecto se ejecute solo una vez al montar el componente