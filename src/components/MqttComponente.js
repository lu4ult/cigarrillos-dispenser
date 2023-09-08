import { useEffect } from "react";
import * as mqtt from "mqtt/dist/mqtt"; // import everything inside the mqtt module and give it the namespace "mqtt"
import { Notify } from "notiflix";
import md5 from "md5";

export const publicarMqtt = (cliente, mac, value) => {
    const idDestino = "susc" + mac + "lu4ult";
    const hash = md5(idDestino);
    if (cliente) {
        cliente.publish(hash, value, error => {
            if (error) {
                console.log('Publish error: ', error);
                Notify.failure("Ups! ", error);
            }
            if (!error) {
                // Notify.success("Data enviada!");
            }
        });
    }
    else {
        Notify.failure("Fallo cliente");
    }
}

const MqttComponente = ({ clienteMqtt, setClienteMqtt }) => {
    const mqttConnect = (host, mqttOption) => {
        setClienteMqtt(mqtt.connect(host, mqttOption));
    };

    useEffect(() => {
        if (!clienteMqtt) {
            try {
                mqttConnect("wss://broker.emqx.io:8084/mqtt", {
                    clean: true,   // Clean session
                    connectTimeout: 10000,
                    // Authentication
                    clientId: `React_${Math.random() * 100000}`,
                    username: 'lu4ult',
                    password: '12345678',
                });
            }
            catch (e) {
                console.log("error mqtt")
                console.log(e);
            }
        }
    }, [clienteMqtt]);

    return (<></>);
}

export default MqttComponente;