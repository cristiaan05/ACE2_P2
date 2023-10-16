import mqtt from 'mqtt'
import { SerialPort, ReadlineParser } from "serialport";
//------------------------  arduino ----------------------
// const port = new SerialPort({
//   path: "COM2",
//   baudRate: 9600,
// });
// const parser = port.pipe(new ReadlineParser({ delimiter: "\n" }));
//------------------------- pub ---------------------

export async function publishA(req, res) {
  const port = new SerialPort({
    path: "COM1",
    baudRate: 9600,
  });
  const parser = port.pipe(new ReadlineParser({ delimiter: "\n" }));
  const pub = mqtt.connect("mqtt://localhost:9000");

  pub.on("connect", () => {
    parser.on("data", (arduino_data) => {
      arduino_data = arduino_data.toString();
      arduino_data = arduino_data.split(" ");
      topic = arduino_data[0];
      dataSend = arduino_data[1];
      console.log('topic :>> ', topic);
      console.log('dataSend :>> ', dataSend);
      pub.publish(topic, dataSend);
    });
  });

  port.on("open", () => {
    console.log("Conexión serial abierta en COM2");
  });

  port.on("error", (err) => {
    console.error("Error en la conexión serial:", err);
  });
}

export async function publishB(req, res) {
  console.log("------------req: ", req.body);
  const pub = mqtt.connect("mqtt://localhost:9000");
  // Publica un mensaje en un tema MQTT
  const topic = "pub"; // Reemplaza por el tema MQTT que desees
  const message = "1.(Mensaje desde Express msj<" + req.body + "> )"; // Reemplaza por el mensaje que desees enviar

  pub.publish(topic, message, (error) => {
    if (!error) {
      console.log(`2.((Mensaje publicado en ${topic}: ${message}))`);
      res.send({ message: "3.Mensaje publicado en MQTT" });
    } else {
      console.error("4. Error al publicar el mensaje en MQTT:", error);
      res
        .status(500)
        .send({ error: "5. Error al publicar el mensaje en MQTT" });
    }
  });
}

//actual: temp,luz,aire,proximidad
//notificaciones: tipoNotificacion