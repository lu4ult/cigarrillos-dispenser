import { Bar, Line } from 'react-chartjs-2'
import { Cart as ChartJS } from 'chart.js/auto'
import { getDateFromAsciiDate } from './utils'

const Grafico = ({ datos }) => {
    const data = {
        labels: Object.keys(datos).map(e => getDateFromAsciiDate(e)),
        datasets: [{
            label: 'Consumos',
            data: Object.values(datos),
            backgroundColor: '#ccc'
        },
            // {
            //     label: 'Previos',
            //     data: [15, 10, 22, 8, 9],
            //     backgroundColor: '#ccc'
            // },
        ]
    }

    return (
        <Bar data={data} />
        // <Line data={data} />
    )
}

export default Grafico;