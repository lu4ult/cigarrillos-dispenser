import { useEffect, useState } from "react";
import { updateEquipoFirestore, updateRaiConfigInFirestore } from "./Firestore";
import Input from "./Input";
import md5 from "md5";
import { iconoClose } from "./icons";


const ModalConfiguracion = ({ equipo, setEditarEquipo }) => {
    // const [valores, setValores] = useState({ nombre: equipo.nombre, cigarrillosRestantes: equipo.valores.cigarrillosRestantes });
    const [valores, setValores] = useState({ ...equipo.infoUsuario });

    const arrayDeKeys = [
        { 'titulo': 'Nombre', 'key': 'nombreUsuario', 'tipo': 'text' },
        // { 'titulo': 'Cantidad Restantes', 'key': 'cigarrillosRestantes', 'tipo': 'text' },
        { 'titulo': 'Color', 'key': 'color', 'tipo': 'color' },
        // { 'titulo': 'Boolean', 'key': 'bool', 'tipo': 'checkbox' },
    ];

    const handleChange = (e) => {
        const key = e.target.name;
        let value = e.target.value;
        if (e.target.type === 'checkbox')
            value = e.target.checked;
        // if (e.target.type === 'text')
        //     value = e.target.value;
        if (e.target.type === 'number')
            value = parseInt(e.target.value);

        let valoresCopia = { ...valores };
        valoresCopia[key] = value;

        if (valoresCopia.nombre?.length > 21) {
            valoresCopia.nombre = valoresCopia.nombre.substring(0, 21);
        }

        setValores(valoresCopia);
    }

    const handleGuardar = () => {
        const objetoAGuardar = {
            infoUsuario: valores
        }

        updateEquipoFirestore(equipo.mac, objetoAGuardar);
        setEditarEquipo({});
    }

    return (
        <div className="modalConfiguracionContainer">
            <div className="modalConfiguracion">
                <button className="cerrar" onClick={() => { setEditarEquipo({}) }}>{iconoClose}</button>
                {/* <p className="titulo">TITULO</p> */}
                {
                    arrayDeKeys.map(k => {
                        return (
                            <Input
                                key={k}
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

export default ModalConfiguracion;