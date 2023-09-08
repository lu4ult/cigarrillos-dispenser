import { useEffect, useState } from "react";
import Input from "./Input";
import { fechaParaInput } from "./utils";
import { iconoClose } from "./icons";
import { updateDatosActualesFirestore, updateHistorialFirestore } from "./Firestore";
import MqttComponente, { publicarMqtt } from "./MqttComponente";

const ModalAgregarManualmente = ({ agregarManualmente, setAgregarManualmente }) => {
    const [clienteMqtt, setClienteMqtt] = useState(null);

    const [valores, setValores] = useState({
        fecha: fechaParaInput(),
        contadorDeCigarros: parseInt(agregarManualmente['valores']['contadorDeCigarros']) + 1,
        cigarrillosRestantes: parseInt(agregarManualmente['valores']['cigarrillosRestantes']) - 1
    });

    const arrayDeKeys = [
        { 'titulo': 'Fecha', 'key': 'fecha', 'tipo': 'datetime-local' },
        { 'titulo': 'Cantidad Total', 'key': 'contadorDeCigarros', 'tipo': 'number' },
        // { 'titulo': 'Boolean', 'key': 'bool', 'tipo': 'checkbox' },
    ];

    const handleChange = (e) => {
        const key = e.target.name;
        let value;
        if (e.target.type === 'checkbox')
            value = e.target.checked;
        if (e.target.type === 'text')
            value = e.target.value;
        if (e.target.type === 'number')
            value = parseInt(e.target.value);
        if (e.target.type === 'datetime-local')
            value = fechaParaInput(new Date(e.target.value))

        let valoresCopia = { ...valores };
        valoresCopia[key] = value;

        setValores(valoresCopia);
    }

    const handleGuardar = () => {
        console.log(valores);
        const timestamp = new Date(valores['fecha']).getTime() / 1000 - 10800;
        let id = timestamp + "-" + agregarManualmente['mac'];
        let cantidad = valores['contadorDeCigarros'];
        let restantes = valores['cigarrillosRestantes'];
        let mac = agregarManualmente['mac'];

        const objetoParaHistoria = {
            contadorDeCigarros: cantidad,
            mac: agregarManualmente['mac'],
        };

        updateHistorialFirestore(id, objetoParaHistoria);
        updateDatosActualesFirestore(agregarManualmente['mac'], { contadorDeCigarros: cantidad.toString(), timestampUltimoCigarro: timestamp.toString(), cigarrillosRestantes: restantes.toString() })
        setAgregarManualmente({});

        const objetoParaMqtt = {
            cant: cantidad,
            rest: restantes,
            ts: timestamp,
        }

        publicarMqtt(clienteMqtt, mac, JSON.stringify(objetoParaMqtt))
    }


    return (
        <div className="modalConfiguracionContainer">
            <div className="modalConfiguracion">
                <button className="cerrar" onClick={() => { setAgregarManualmente({}) }}>{iconoClose}</button>
                {
                    arrayDeKeys.map(k => {
                        return (
                            <Input
                                // key={k}
                                props={k}
                                valores={valores}
                                handleChange={handleChange}
                            />
                        )
                    })
                }
            </div>

            <button className="guardar" onClick={handleGuardar}>GUARDAR</button>
            <MqttComponente clienteMqtt={clienteMqtt} setClienteMqtt={setClienteMqtt} />
        </div>
    );
}

export default ModalAgregarManualmente;