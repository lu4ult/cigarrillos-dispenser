import { iconoArrowDown, iconoArrowUp } from "./icons";
import { haceCuantoTiempoStr } from "./utils";

const DispenserMain = ({ datos }) => {

    if (datos.length === 0) {
        return (<p>Vacio</p>);
    }
    // console.log(datos[0])

    return (
        datos.map((data, indice) => {
            return (
                <div className="dispenserMainContainer" key={`disp${indice}`}>
                    <div className="dispenserData">
                        <div className={`dispenserData__contador ${data.diferencia > 0 ? 'rojo' : 'verde'}`}>{data.valores.contadorDeCigarros}</div>
                        <div className="dispenserData__restantes">
                            <div>{haceCuantoTiempoStr(data.momentoUltimo)}</div>
                            <div>Quedan: {data.valores.cigarrillosRestantes}</div>
                        </div>
                        <div className={`dispenserData__flecha ${data.diferencia > 0 ? 'rojo' : 'verde'}`} >
                            <div>{data.diferencia >= 0 ? iconoArrowUp : iconoArrowDown}</div>
                            <div>{data.diferencia >= 0 ? '+' : ''}{data.diferencia}</div>
                            {/* <div>{JSON.stringify(data.historial)}</div> */}
                        </div>

                        {/* <div className="dispenserData__diferencia">{data.valores.timestampUltimoCigarro}</div> */}
                    </div>
                </div >
            )
        })
    )

}

export default DispenserMain;