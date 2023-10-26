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
  const message = "1.(Mensaje desde Express msj<)"; // Reemplaza por el mensaje que desees enviar
  pub.on("connect", () => {
    pub.publish(topic, message, { retain: true }, (error) => {
      console.log('topic', topic)
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
  });
}

export async function leerSensores(req, res) {
  const port = new SerialPort({
    path: "COM5",
    baudRate: 9600,
  });
  const parser = port.pipe(new ReadlineParser({ delimiter: "\n" }));
  const pub = mqtt.connect("mqtt://localhost:9000");

  pub.on("connect", () => {
    parser.on("data", (arduino_data) => {
      arduino_data = arduino_data.toString();
      arduino_data = arduino_data.split(" ");
      humedadTopic = arduino_data[0];
      humedadData = arduino_data[1];
      tempTopic = arduino_data[2];
      tempData = arduino_data[3];
      luzTopic = arduino_data[4];
      luzData = arduino_data[5];
      gasTopic = arduino_data[6];
      gasData = arduino_data[7];
      disTopic = arduino_data[8];
      disData = arduino_data[9];
      console.log('topic :>> ', topic);
      console.log('dataSend :>> ', dataSend);
      pub.publish(topic, dataSend);
      db.query(`INSERT INTO actual (temperatura,luz,aire,proximidad) VALUES (tempData,luzTopic,gasTopic,disTopic)`, (err, rows) => {
        if (err) throw err;
        console.log(rows);
      });
    });
  });

  port.on("open", () => {
    console.log("Conexión serial abierta en COM2");
  });

  port.on("error", (err) => {
    console.error("Error en la conexión serial:", err);
  });
}

//actual: temp,luz,aire,proximidad
//notificaciones: tipoNotificacion