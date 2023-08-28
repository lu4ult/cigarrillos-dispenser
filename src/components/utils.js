export const haceCuantoTiempoStr = (fecha1, fecha2) => {
    //Si pasaron sólo una fecha hay que comparar con la hora actual.
    if (typeof (fecha1) === 'object' && fecha2 === undefined) {
        fecha2 = fecha1;
        fecha1 = new Date();
    }

    if (typeof (fecha1) !== 'object')
        return 'fecha 1 no es objeto';

    if (typeof (fecha2) !== 'object')
        return 'fecha 2 no es objeto';

    const esFuturoOPasado = fecha1 < fecha2 ? 'En' : 'Hace';
    const diferenciaTiempoMinutos = parseInt(Math.abs((fecha1 - fecha2)) / 60000);

    if (diferenciaTiempoMinutos > 3 * 24 * 60)
        return `${esFuturoOPasado} ${parseInt(diferenciaTiempoMinutos / (24 * 60))} días`;

    const txt = diferenciaTiempoMinutos === 0 ? 'Ahora' : diferenciaTiempoMinutos >= 60 ? `${esFuturoOPasado} ${parseInt(diferenciaTiempoMinutos / 60)} hora${parseInt(diferenciaTiempoMinutos / 60) > 1 ? 's' : ''}` : `${esFuturoOPasado} ${diferenciaTiempoMinutos} minuto${diferenciaTiempoMinutos > 1 ? 's' : ''}`;
    return txt;
}


export const fechaFormatoReducido = (fecha) => {
    let dowNombre = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    let dow = fecha.getDay();
    let diaNumero = fecha.getDate();

    let str = "";
    if (new Date().getDay() !== dow) {
        str += dowNombre[dow] + " " + diaNumero + ", ";
    }

    str += fecha.toLocaleTimeString();
    return str;
}