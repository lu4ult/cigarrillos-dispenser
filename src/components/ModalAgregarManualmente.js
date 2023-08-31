import { useEffect, useState } from "react";
import Input from "./Input";
import { fechaParaInput } from "./utils";
import { iconoClose } from "./icons";
import { updateDatosActualesFirestore, updateHistorialFirestore } from "./Firestore";

const ModalAgregarManualmente = ({ agregarManualmente, setAgregarManualmente }) => {
    const [valores, setValores] = useState({
        fecha: fechaParaInput(),
        contadorDeCigarros: 1 + parseInt(agregarManualmente['valores']['contadorDeCigarros'])
    });

    console.log(agregarManualmente)
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
        const timestamp = new Date(valores['fecha']).getTime() / 1000 - 10800;
        let id = timestamp + "-" + agregarManualmente['mac'];
        let cantidad = valores['contadorDeCigarros'];

        const objeto = {
            contadorDeCigarros: cantidad,
            mac: agregarManualmente['mac'],
            // simulacion: true
        };

        updateHistorialFirestore(id, objeto);
        updateDatosActualesFirestore(agregarManualmente['mac'], { contadorDeCigarros: cantidad.toString(), timestampUltimoCigarro: timestamp.toString() })
        setAgregarManualmente({});
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
        </div>
    );
}

export default ModalAgregarManualmente;