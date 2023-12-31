import { useState } from "react";
import ModalConfiguracion from "./ModalConfiguracion";
import { iconoArrowDown, iconoArrowUp, iconoEditar, iconoGrafico, iconoPlus } from "./icons";
import { haceCuantoTiempoStr } from "./utils";
import ModalAgregarManualmente from "./ModalAgregarManualmente";

const DispenserMain = ({ datos, setDispositivoAGraficar }) => {
    const [editarEquipo, setEditarEquipo] = useState({});
    const [agregarManualmente, setAgregarManualmente] = useState({});
    if (datos.length === 0) {
        return (<p>Vacio</p>);
    }

    return (
        <div className={`dispenserMainContainer ${datos.length > 1 ? 'varios' : ''}`}>
            {
                datos.map((data, indice) => {
                    return (
                        <div className="dispenserData" key={`disp${indice}`} style={{ 'border-color': data?.infoUsuario?.color || 'blueviolet', 'box-shadow': `4px 4px 5px ${data?.infoUsuario?.color || 'blueviolet'}` }}>
                            <div className="dispenserData__botonera">
                                <button onClick={() => { setDispositivoAGraficar(data?.mac) }}>{iconoGrafico}</button>
                                <button onClick={() => { setEditarEquipo(data) }}>{iconoEditar}</button>
                                <button onClick={() => { setAgregarManualmente(data) }}>{iconoPlus}</button>
                            </div>
                            <div className="dispenserData__nombre">
                                {data?.infoUsuario?.nombreUsuario || ''}
                            </div>
                            <div className={`dispenserData__contador ${data?.diferencia > 0 ? 'rojo' : 'verde'}`}>{data?.valores.contadorDeCigarros}</div>
                            <div className="dispenserData__restantes">
                                <div>{haceCuantoTiempoStr(data?.momentoUltimo)}</div>
                                <div>Quedan: {data?.valores.cigarrillosRestantes}</div>
                            </div>
                            <div className={`dispenserData__flecha ${data?.diferencia > 0 ? 'rojo' : 'verde'}`} >
                                <div className="iconoContainer">{data?.diferencia >= 0 ? iconoArrowUp : iconoArrowDown}</div>
                                <div>{data?.diferencia >= 0 ? '+' : ''}{data?.diferencia}</div>
                            </div>
                        </div>
                    )
                })
            }
            {
                JSON.stringify(editarEquipo) === '{}'
                    ? <></>
                    : <ModalConfiguracion equipo={editarEquipo} setEditarEquipo={setEditarEquipo} />
            }
            {
                JSON.stringify(agregarManualmente) === '{}'
                    ? <></>
                    : <ModalAgregarManualmente agregarManualmente={agregarManualmente} setAgregarManualmente={setAgregarManualmente} />
            }
        </div >
    )

}

export default DispenserMain;