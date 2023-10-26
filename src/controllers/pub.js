import mqtt from 'mqtt'
import db from '../db.js'
import { SerialPort, ReadlineParser } from "serialport";
//------------------------  arduino ----------------------
// const port = new SerialPort({
//   path: "COM5",
//   baudRate: 9600,
// });
// const parser = port.pipe(new ReadlineParser({ delimiter: "\n" }));
//------------------------- pub ---------------------

export async function publishA(req, res) {
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
  let tempTopic, tempData, luzTopic, luzData, gasTopic, gasData, disTopic, disData
  pub.on("connect", () => {
    parser.on("data", (arduino_data) => {
      arduino_data = arduino_data.toString();
      arduino_data = arduino_data.split(" ");
      console.log(arduino_data)
      //humedadTopic = arduino_data[0];
      //humedadData = arduino_data[1];
      tempTopic = arduino_data[0];
      tempData = arduino_data[1];
      luzTopic = arduino_data[2];
      luzData = arduino_data[3];
      gasTopic = arduino_data[4];
      gasData = arduino_data[5];
      disTopic = arduino_data[6];
      disData = arduino_data[7];
      //pub.publish(humedadTopic, humedadData);
      pub.publish(tempTopic, tempData);
      pub.publish(luzTopic, luzData);
      pub.publish(gasTopic, gasData);
      pub.publish(disTopic, disData);
      db.query(`INSERT INTO actual (temperatura,luz,aire,proximidad) VALUES ('${tempData}','${luzData}','${gasData}',${parseInt(disData)})`, (err, rows) => {
        if (err) throw err;
        console.log(rows);
      });
      return res.send("OK")
    });
  });

  port.on("open", () => {
    console.log("Conexión serial abierta en COM2");
  });

  port.on("error", (err) => {
    console.error("Error en la conexión serial:", err);
  });
}

export async function historico3(req, res) {
  const port = new SerialPort({
    path: "COM5",
    baudRate: 9600,
  });
  const parser = port.pipe(new ReadlineParser({ delimiter: "\n" }));
  const pub = mqtt.connect("mqtt://localhost:9000");
  let tempTopic, tempData, luzTopic, luzData, gasTopic, gasData, disTopic, disData
  pub.on("connect", () => {
    parser.on("data", (arduino_data) => {
      arduino_data = arduino_data.toString();
      arduino_data = arduino_data.split(" ");
      console.log(arduino_data)
      //humedadTopic = arduino_data[0];
      //humedadData = arduino_data[1];
      tempTopic = arduino_data[0];
      tempData = arduino_data[1];
      luzTopic = arduino_data[2];
      luzData = arduino_data[3];
      gasTopic = arduino_data[4];
      gasData = arduino_data[5];
      disTopic = arduino_data[6];
      disData = arduino_data[7];
      //pub.publish(humedadTopic, humedadData);
      pub.publish(tempTopic, tempData);
      pub.publish(luzTopic, luzData);
      pub.publish(gasTopic, gasData);
      pub.publish(disTopic, disData);
      db.query(`INSERT INTO historico3 (temperatura,luz,aire,proximidad) VALUES ('${tempData}','${luzData}','${gasData}',${parseInt(disData)})`, (err, rows) => {
        if (err) throw err;
        console.log(rows);
      });
      return res.send("OK")
    });
  });

  port.on("open", () => {
    console.log("Conexión serial abierta en COM2");
  });

  port.on("error", (err) => {
    console.error("Error en la conexión serial:", err);
  });
}


export async function historico2(req, res) {
  const port = new SerialPort({
    path: "COM5",
    baudRate: 9600,
  });
  const parser = port.pipe(new ReadlineParser({ delimiter: "\n" }));
  const pub = mqtt.connect("mqtt://localhost:9000");
  let tempTopic, tempData, luzTopic, luzData, gasTopic, gasData, disTopic, disData
  pub.on("connect", () => {
    parser.on("data", (arduino_data) => {
      arduino_data = arduino_data.toString();
      arduino_data = arduino_data.split(" ");
      console.log(arduino_data)
      //humedadTopic = arduino_data[0];
      //humedadData = arduino_data[1];
      tempTopic = arduino_data[0];
      tempData = arduino_data[1];
      luzTopic = arduino_data[2];
      luzData = arduino_data[3];
      gasTopic = arduino_data[4];
      gasData = arduino_data[5];
      disTopic = arduino_data[6];
      disData = arduino_data[7];
      //pub.publish(humedadTopic, humedadData);
      pub.publish(tempTopic, tempData);
      pub.publish(luzTopic, luzData);
      pub.publish(gasTopic, gasData);
      pub.publish(disTopic, disData);
      db.query(`INSERT INTO historico2 (temperatura,luz,aire,proximidad) VALUES ('${tempData}','${luzData}','${gasData}',${parseInt(disData)})`, (err, rows) => {
        if (err) throw err;
        console.log(rows);
      });
      return res.send("OK")
    });
  });

  port.on("open", () => {
    console.log("Conexión serial abierta en COM2");
  });

  port.on("error", (err) => {
    console.error("Error en la conexión serial:", err);
  });
}

export async function historico1(req, res) {
  const port = new SerialPort({
    path: "COM5",
    baudRate: 9600,
  });
  const parser = port.pipe(new ReadlineParser({ delimiter: "\n" }));
  const pub = mqtt.connect("mqtt://localhost:9000");
  let tempTopic, tempData, luzTopic, luzData, gasTopic, gasData, disTopic, disData
  pub.on("connect", () => {
    parser.on("data", (arduino_data) => {
      arduino_data = arduino_data.toString();
      arduino_data = arduino_data.split(" ");
      console.log(arduino_data)
      //humedadTopic = arduino_data[0];
      //humedadData = arduino_data[1];
      tempTopic = arduino_data[0];
      tempData = arduino_data[1];
      luzTopic = arduino_data[2];
      luzData = arduino_data[3];
      gasTopic = arduino_data[4];
      gasData = arduino_data[5];
      disTopic = arduino_data[6];
      disData = arduino_data[7];
      //pub.publish(humedadTopic, humedadData);
      pub.publish(tempTopic, tempData);
      pub.publish(luzTopic, luzData);
      pub.publish(gasTopic, gasData);
      pub.publish(disTopic, disData);
      db.query(`INSERT INTO historico1 (temperatura,luz,aire,proximidad) VALUES ('${tempData}','${luzData}','${gasData}',${parseInt(disData)})`, (err, rows) => {
        if (err) throw err;
        console.log(rows);
      });
      return res.send("OK")
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