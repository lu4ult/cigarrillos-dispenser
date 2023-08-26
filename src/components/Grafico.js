import { Line } from 'react-chartjs-2'
import { Cart as ChartJS } from 'chart.js/auto'


const Grafico = ({ datos }) => {
    const titulos = datos.map(data => data.date.toLocaleString());
    const valores = datos.map(data => data.contadorDeCigarros);
    const millis = datos.map(data => data.millis);

    const data = {
        labels: titulos,
        datasets: [{
            label: 'Consumos',
            data: valores,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.2
        },
        {
            label: 'Encendido',
            data: millis,
            fill: false,
            borderColor: 'rgb(250, 250, 200)',
            tension: 0.2
        },
            // {
            //     label: 'Previos',
            //     data: [15, 10, 22, 8, 9],
            //     backgroundColor: '#ccc'
            // },
        ]
    }

    return (
        <div className='graphContainer'>
            <Line data={data} />
        </div >
    )
}

export default Grafico;