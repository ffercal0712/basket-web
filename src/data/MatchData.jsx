import equipos from './TeamData.jsx';

function getTeamById(id) {
    const equipo = equipos.find((item) => item.id === id);

    if (!equipo) {
        throw new Error(`Equipo no encontrado para el id ${id}`);
    }

    return equipo;
}

function createScheduledTeam(id, puntuacion = null) {
    return {
        ...getTeamById(id),
        puntuacion
    };
}

function createPendingTeam(id, equipo, note) {
    return {
        id: `pending-${id}`,
        slug: null,
        equipo,
        note,
        placeholder: true,
        puntuacion: null
    };
}

const partidos = [
    {
        id: 1,
        fecha: '16-05-2026',
        hora: '16:00',
        horaFin: '17:15',
        titulo: 'Jornada del sábado',
        nota: 'Partido confirmado del cuadro principal.',
        equipos: [
            createScheduledTeam(1),
            createScheduledTeam(2)
        ]
    },
    {
        id: 2,
        fecha: '16-05-2026',
        hora: '17:15',
        horaFin: '18:30',
        titulo: 'Jornada del sábado',
        nota: 'Partido confirmado del cuadro principal.',
        equipos: [
            createScheduledTeam(3),
            createScheduledTeam(4)
        ]
    },
    {
        id: 3,
        fecha: '16-05-2026',
        hora: '18:30',
        horaFin: '19:45',
        titulo: 'Jornada del sábado',
        nota: 'Partido confirmado del cuadro principal.',
        equipos: [
            createScheduledTeam(5),
            createScheduledTeam(6)
        ]
    },
    {
        id: 4,
        fecha: '16-05-2026',
        hora: '19:45',
        horaFin: '21:00',
        titulo: 'Jornada del sábado',
        nota: 'Partido confirmado del cuadro principal.',
        equipos: [
            createScheduledTeam(7),
            createScheduledTeam(8)
        ]
    },
    {
        id: 5,
        fecha: '17-05-2026',
        hora: '09:15',
        horaFin: '10:20',
        titulo: 'Cruce 7º vs 8º',
        nota: 'Los equipos se definirán cuando termine la clasificación del sábado.',
        equipos: [
            createPendingTeam(7, '7º clasificado', 'Pendiente de clasificación del sábado.'),
            createPendingTeam(8, '8º clasificado', 'Pendiente de clasificación del sábado.')
        ]
    },
    {
        id: 6,
        fecha: '17-05-2026',
        hora: '10:20',
        horaFin: '11:30',
        titulo: 'Cruce 5º vs 6º',
        nota: 'Los equipos se definirán cuando termine la clasificación del sábado.',
        equipos: [
            createPendingTeam(5, '5º clasificado', 'Pendiente de clasificación del sábado.'),
            createPendingTeam(6, '6º clasificado', 'Pendiente de clasificación del sábado.')
        ]
    },
    {
        id: 7,
        fecha: '17-05-2026',
        hora: '11:30',
        horaFin: '12:45',
        titulo: 'Cruce 3º vs 4º',
        nota: 'Los equipos se definirán cuando termine la clasificación del sábado.',
        equipos: [
            createPendingTeam(3, '3º clasificado', 'Pendiente de clasificación del sábado.'),
            createPendingTeam(4, '4º clasificado', 'Pendiente de clasificación del sábado.')
        ]
    },
    {
        id: 8,
        fecha: '17-05-2026',
        hora: '12:45',
        horaFin: '14:00',
        titulo: 'Final del torneo',
        nota: 'La jugarán el 1º y el 2º clasificado de la jornada del sábado.',
        equipos: [
            createPendingTeam(1, '1º clasificado', 'Pendiente de clasificación del sábado.'),
            createPendingTeam(2, '2º clasificado', 'Pendiente de clasificación del sábado.')
        ]
    }
];

/**
 * Convierte una fecha "DD-MM-YYYY" y hora "HH:MM" en un objeto Date.
 *
 * @param {string} fecha - Formato "DD-MM-YYYY"
 * @param {string} hora - Formato "HH:MM"
 * @returns {Date}
 */
export function partidoToDate(fecha, hora) {
    const [day, month, year] = fecha.split('-').map(Number);
    const [hours, minutes] = hora.split(':').map(Number);
    return new Date(year, month - 1, day, hours, minutes);
}

/**
 * Retorna el estado del partido: "proximo", "en-juego", o "finalizado"
 */
export function estadoPartido(partido) {
    const ahora = new Date();
    const inicio = partidoToDate(partido.fecha, partido.hora);
    const fin = partidoToDate(partido.fecha, partido.horaFin);

    if (ahora < inicio) return 'proximo';
    if (ahora >= inicio && ahora < fin) return 'en-juego';
    return 'finalizado';
}

/**
 * Determina si un partido ya se ha jugado en función de su fecha y hora.
 * Se considera jugado si la fecha+hora del partido es anterior a "ahora".
 *
 * @param {{ fecha: string, hora: string }} partido
 * @returns {boolean}
 */
export function partidoYaJugado(partido) {
    return estadoPartido(partido) === 'finalizado';
}

export function partidoTieneResultado(partido) {
    return partido.equipos.every((equipo) => Number.isFinite(equipo.puntuacion));
}

export function formatearFechaCorta(fecha) {
    const [day, month, year] = fecha.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    const dias = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
    return `${dias[date.getDay()]} ${parseInt(day)}`;
}

export default partidos;
