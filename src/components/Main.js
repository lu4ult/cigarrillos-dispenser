import { collection, deleteDoc, doc, onSnapshot, query, setDoc, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "./Firebase";
import DispenserMain from "./DispenserMain";
import { Loading } from "notiflix";
import Grafico from "./Grafico";


const Main = () => {
    const [estaCargando, setEstaCargando] = useState(true);
    const [datos, setDatos] = useState([]);
    const [historial, setHistorial] = useState([]);
    const [dispositivoAGraficar, setDispositivoAGraficar] = useState('E8:9F:6D:94:27:81');
    // const [analizar, setAnalizar] = useState(false);

    const borrarDatosSimulados = () => {
        const aBorrar = historial.filter(h => h.simulacion)
        aBorrar.forEach((e, indice) => {
            setTimeout(() => {
                deleteDoc(doc(db, "historial-cigarros", e.id));
            }, indice * 100);
        })
    }

    const simularDatos = () => {
        for (let dias = 1; dias < 15; dias++) {
            const cantidadCigarrillosPorDia = 5 + Math.floor(Math.random() * 15);
            for (let horas = 0; horas < cantidadCigarrillosPorDia; horas++) {
                let fecha = new Date(new Date() - horas * 60 * 60 * 1000 - dias * 24 * 60 * 60 * 1000);
                let timestamp = parseInt(fecha.getTime() / 1000);

                let timeout = 100 * dias + horas;
                setTimeout(() => {
                    setDoc(doc(db, "historial-cigarros", `${timestamp}-E8:9F:6D:94:27:81`), { 'simulacion': true, 'contadorDeCigarros': cantidadCigarrillosPorDia - horas });
                }, timeout);
            }
        }
    }


    useEffect(() => {
        const qh = query(collection(db, "historial-cigarros"));
        onSnapshot(qh, (querySnapshot) => {
            let historia = [];
            querySnapshot.forEach((doc) => {
                let timestamp = doc.id.split('-')[0];
                let mac = doc.id.split('-')[1];

                historia.push({ ...doc.data(), 'id': doc.id, 'mac': mac, 'date': new Date((parseInt(timestamp) * 1000) + (3 * 60 * 60 * 1000)) });
            });
            setHistorial(historia);
        });

        const q = query(collection(db, 'cigarrillos'), where("usuario", "==", "lautaro"));
        onSnapshot(q, (querySnapshot) => {
            const _dispositivos = [];
            querySnapshot.forEach((doc) => {

                const objeto = { ...doc.data(), 'mac': doc.id };

                objeto['momentoUltimo'] = new Date(1000 * parseInt(objeto.valores.timestampUltimoCigarro) + 3 * 60 * 60 * 1000);
                _dispositivos.push(objeto);
            });

            if (estaCargando) {
                setEstaCargando(false);
            }

            setDatos([..._dispositivos]);
        });
    }, []);

    useEffect(() => {
        if (estaCargando)
            Loading.hourglass();

        else {
            setTimeout(() => {
                Loading.remove();
            }, 500);
        }
    }, [estaCargando]);

    // useEffect(() => {
    //     console.log("cambio")
    // }, [datos]);



    //Calculamos cuantos se fumó en las últimas 24 horas restando la cantidad actual y el máximo de ayer según el historial.
    //Usamos useEffect según estaCargando porque al iniciar puede que el historial este vacío, y da -infinito, y historial.length para que se re-calculo instantáneamente
    useEffect(() => {
        let datosCopia = [...datos];
        const fechaAyer = new Date(new Date() - 24 * 60 * 60 * 1000);

        datosCopia.forEach(equipo => {
            let cigarrosAyer = historial.filter(e => e.mac === equipo['mac'] && e.date >= fechaAyer);
            let cantidadFumadosAyer = Math.max(...cigarrosAyer.map(e => e.contadorDeCigarros));
            equipo.diferencia = equipo.valores.contadorDeCigarros - cantidadFumadosAyer;
        });
        console.log(datosCopia)
        setDatos([...datosCopia]);

    }, [historial.length, estaCargando]);

    return (
        <main>
            {!estaCargando ? <Grafico datos={historial.filter(h => h.mac === dispositivoAGraficar)} /> : <></>}
            {/* <button onClick={simularDatos}>Simular</button>
            <button onClick={borrarDatosSimulados}>Limpiar</button>
            <button onClick={() => { setAnalizar(!analizar) }}>Analizar</button> */}
            <DispenserMain datos={datos} setDispositivoAGraficar={setDispositivoAGraficar} />
        </main>
    );
}

export default Main;