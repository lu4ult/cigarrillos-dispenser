import { collection, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "./Firebase";
import DispenserMain from "./DispenserMain";
import { fechaDigitos, getStrDateyyyymmdd } from "./utils";
import { Loading } from "notiflix";


const Main = () => {
    const [estaCargando, setEstaCargando] = useState(true);
    const [datos, setDatos] = useState([]);
    const [historial, setHistorial] = useState({});

    // const fechas = ['20230825', '20230824', '20230823', '20230822', '20230821', '20230718'];

    // fechas.forEach(fecha => {
    //     fechaDigitos(fecha);
    // })
    // const fechas = ['20230825'];

    // fechas.forEach(fecha => {
    //     fechaDigitos(fecha);
    // })
    const fechaAyer = new Date(new Date() - 24 * 60 * 60 * 1000);
    let fechaAyerEnDigitos = fechaDigitos(getStrDateyyyymmdd(fechaAyer));
    // console.log(fechaAyerEnDigitos)

    // console.log(new Date(1692880430 * 1000))

    useEffect(() => {
        //console.log("Hola!");
        let historia = {};

        const filtro = query(collection(db, "historial"));
        getDocs(filtro).then((respuesta) => {

            respuesta.docs.forEach(doc => {
                let mac = doc.id;
                let datos = doc.data();
                historia[mac] = datos;
            })
            setHistorial(historia);
        }).then(() => {
            const q = query(collection(db, 'cigarrillos'), where("usuario", "==", "lautaro"));
            onSnapshot(q, (querySnapshot) => {
                const _dispositivos = [];
                querySnapshot.forEach((doc) => {

                    const objeto = { ...doc.data(), 'mac': doc.id };

                    objeto['momentoUltimo'] = new Date(1000 * parseInt(objeto.valores.timestampUltimoCigarro) + 3 * 60 * 60 * 1000);
                    console.log(objeto)
                    objeto['cantidadDeAyer'] = parseInt(historia[objeto.mac][fechaAyerEnDigitos]) || 0;
                    // objeto['diferencia'] = objeto.valores.contadorDeCigarros - objeto['cantidadDeAyer'] || 0;
                    objeto['diferencia'] = objeto['cantidadDeAyer'] ? objeto.valores.contadorDeCigarros - objeto['cantidadDeAyer'] : objeto.valores.contadorDeCigarros;


                    _dispositivos.push(objeto);
                })

                setEstaCargando(false);
                setDatos([..._dispositivos]);
            });
        })



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
    //     console.log(JSON.stringify(historial))
    //     // if (historial) {
    //     //     console.log(historial)
    //     //     console.log(historial['10:52:1C:01:F4:C6']['CACDAICE'])

    //     // }
    // }, [historial])

    return (
        <main>
            {/* <p>{JSON.stringify(datos)}</p> */}
            <DispenserMain datos={datos} />
        </main>
    );
}

export default Main;