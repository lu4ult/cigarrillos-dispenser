export const fechaDigitos = (fecha) => {
    let convertedString = [];
    const conversionArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

    for (let i = 0; i < fecha.length; i++) {
        convertedString.push(conversionArray[parseInt(fecha[i])]);
    }
    convertedString = convertedString.join('');

    return convertedString;
}

// Devuelve un string en formato yyyymmdd, ejemplo para 24/07/2023 => 20230724
export const getStrDateyyyymmdd = (fecha) => {
    let ano = fecha.getYear() + 1900;
    let mes = fecha.getMonth() + 1;
    let dia = fecha.getDate()

    let str = `${ano}${mes < 10 ? '0' : ''}${mes}${dia < 10 ? '0' : ''}${dia}`;
    return str;
}

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
