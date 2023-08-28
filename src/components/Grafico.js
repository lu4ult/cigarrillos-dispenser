import { Bar, Line } from 'react-chartjs-2'
import { Cart as ChartJS } from 'chart.js/auto'
import { useEffect, useState } from 'react';
import { arrayRange, fechaFormatoReducido } from './utils';


const Grafico = ({ historial, borrarDatosSimulados }) => {
    const [tipoDeGrafico, setTipoDeGrafico] = useState(2);

    const [datosParaGrafico, setDatosParaGraficos] = useState({});

    useEffect(() => {
        let titulos = [];
        let valores = [];
        let data = {};

        switch (tipoDeGrafico) {
            case 1: {
                titulos = historial.map(data => fechaFormatoReducido(data.date));
                valores = historial.map(data => data.contadorDeCigarros);

                data = {
                    labels: titulos,
                    datasets: [{
                        label: 'Consumos',
                        data: valores,
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.2
                    }]
                };
                break;
            }
            case 2: {
                let fechaInferior;
                let fechaSuperior;
                for (let i = 0; i < 48; i++) {
                    // console.log("----");
                    // console.log(i);
                    let ahora = new Date();
                    fechaInferior = new Date(ahora.setHours(ahora.getHours(), 0, 0, 0));
                    fechaSuperior = new Date();

                    if (i >= 1) {
                        fechaSuperior = new Date(fechaInferior - (i - 1) * 60 * 60 * 1000 - 1000);
                        fechaInferior = new Date(fechaSuperior - 60 * 60 * 1000 + 1000);
                    }

                    // console.log(fechaInferior.toLocaleString())
                    // console.log(fechaSuperior.toLocaleString())
                    let cigarrosDelPeriodo = historial.filter(e => e.date >= fechaInferior && e.date <= fechaSuperior);

                    // console.log(cigarrosDelPeriodo.length)
                    // titulos.push(i === 0 ? 'Hace 1 hora' : `${i + 1} horas`);
                    let titulo = fechaInferior.getHours();
                    titulos.push(titulo);
                    valores.push(cigarrosDelPeriodo.length);

                }
                titulos.reverse();
                valores.reverse();

                data = {
                    labels: titulos,
                    datasets: [{
                        label: 'Consumos',
                        data: valores,
                        backgroundColor: 'rgb(75, 192, 192)'
                    }]
                };
                break;
            }
            case 3: {
                for (let i = 0; i < 31; i++) {
                    // console.log("----");
                    let hoy = new Date();
                    let fechaSuperior;
                    let fechaInferior;

                    //El primer valor tiene que ser los fumados en el dia de hoy, por ejemplo si son las 20 horas, entre las 00:00 y las 20:00, el resto sí en un rango de 24 horas
                    if (i === 0) {
                        fechaSuperior = new Date();
                        fechaInferior = new Date(hoy.setHours(0, 0, 0, 0));
                    }
                    else {
                        fechaSuperior = new Date(hoy.setHours(0, 0, 0, 0));
                        fechaSuperior = new Date(fechaSuperior - (i - 1) * 24 * 60 * 60 * 1000 - 1000);
                        fechaInferior = new Date(fechaSuperior - 24 * 60 * 60 * 1000 + 1000);
                    }

                    // console.log(i);
                    console.log(fechaSuperior.toLocaleString())
                    console.log(fechaInferior.toLocaleString())

                    let cigarrosDelPeriodo = historial.filter(e => e.date >= fechaInferior && e.date <= fechaSuperior);
                    let cantidadMaximaDelDia = cigarrosDelPeriodo.length === 0 ? 0 : Math.max(...cigarrosDelPeriodo.map(e => e.contadorDeCigarros));

                    // console.log(cigarrosDelPeriodo.length)
                    // titulos.push(i === 0 ? 'Hoy' : `Hace ${i + 1} días`);

                    let dowNombre = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

                    titulos.push(i === 0 ? 'Hoy' : dowNombre[fechaInferior.getDay()] + " " + fechaInferior.getDate());
                    valores.push(cantidadMaximaDelDia);
                }
                titulos.reverse();
                valores.reverse();

                data = {
                    labels: titulos,
                    datasets: [{
                        label: 'Consumos',
                        data: valores,
                        backgroundColor: 'rgb(75, 192, 192)'
                    }]
                };

                break;
            }
        }

        setDatosParaGraficos(data);

    }, [tipoDeGrafico]);

    const handleBotonClick = (value) => {
        // console.log(value)
        setTipoDeGrafico(value);
    }

    return (
        <div className='graphContainer'>
            <div className='graph'>
                {JSON.stringify(datosParaGrafico) === '{}'
                    ? <></>
                    : tipoDeGrafico >= 2
                        ? <Bar data={datosParaGrafico} />
                        : <Line data={datosParaGrafico} />
                }
                {/* <Bar data={datosParaGrafico} /> */}

            </div>
            <div className='botonera'>
                <button disabled={tipoDeGrafico === 1} className={tipoDeGrafico === 1 ? 'active' : null} onClick={() => { handleBotonClick(1) }}>Todos</button>
                <button disabled={tipoDeGrafico === 2} className={tipoDeGrafico === 2 ? 'active' : null} onClick={() => { handleBotonClick(2) }}>Diario</button>
                <button disabled={tipoDeGrafico === 3} className={tipoDeGrafico === 3 ? 'active' : null} onClick={() => { handleBotonClick(3) }}>Mensual</button>

                <button disabled={false} onClick={borrarDatosSimulados}>Limpiar</button>

            </div>
        </div >
    )
}

export default Grafico;