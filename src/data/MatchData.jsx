import equipos from "./TeamData.jsx";

let partidos;
partidos = [
    /*{
        id: 1,
        fecha: "16-05-2025",
        hora: "10:00",
        horaFin: "12:00",
        equipos: [
            {
                ...equipos.find((equipo) => equipo.id === 1),
                puntuacion: 2
            },
            {
                ...equipos.find((equipo) => equipo.id === 2),
                puntuacion: 3
            }
        ]
    },
    {
        id: 2,
        fecha: "17-05-2025",
        hora: "12:30",
        horaFin: "14:30",
        equipos: [
            {
                ...equipos.find((equipo) => equipo.id === 2),
                puntuacion: 1
            },
            {
                ...equipos.find((equipo) => equipo.id === 1),
                puntuacion: 1
            }
        ]
    },
    {
        id: 3,
        fecha: "16-05-2026",
        hora: "11:15",
        horaFin: "13:15",
        equipos: [
            {
                ...equipos.find((equipo) => equipo.id === 3),
                puntuacion: 0
            },
            {
                ...equipos.find((equipo) => equipo.id === 2),
                puntuacion: 0
            }
        ]
    },
    {
        id: 4,
        fecha: "16-05-2026",
        hora: "12:30",
        horaFin: "14:30",
        equipos: [
            {
                ...equipos.find((equipo) => equipo.id === 1),
                puntuacion: 0
            },
            {
                ...equipos.find((equipo) => equipo.id === 3),
                puntuacion: 0
            }
        ]
    },
    {
        id: 5,
        fecha: "16-05-2026",
        hora: "10:00",
        horaFin: "12:00",
        equipos: [
            {
                ...equipos.find((equipo) => equipo.id === 4),
                puntuacion: 0
            },
            {
                ...equipos.find((equipo) => equipo.id === 2),
                puntuacion: 0
            }
        ]
    },
    {
        id: 6,
        fecha: "17-05-2026",
        hora: "09:45",
        horaFin: "11:45",
        equipos: [
            {
                ...equipos.find((equipo) => equipo.id === 1),
                puntuacion: 0
            },
            {
                ...equipos.find((equipo) => equipo.id === 4),
                puntuacion: 0
            }
        ]
    },
    {
        id: 7,
        fecha: "17-05-2025",
        hora: "13:55",
        horaFin: "15:55",
        equipos: [
            {
                ...equipos.find((equipo) => equipo.id === 3),
                puntuacion: 0
            },
            {
                ...equipos.find((equipo) => equipo.id === 4),
                puntuacion: 2
            }
        ]
    },
    {
        id: 8,
        fecha: "16-05-2025",
        hora: "12:10",
        horaFin: "14:10",
        equipos: [
            {
                ...equipos.find((equipo) => equipo.id === 2),
                puntuacion: 1
            },
            {
                ...equipos.find((equipo) => equipo.id === 3),
                puntuacion: 0
            }
        ]
    },
    {
        id: 9,
        fecha: "16-05-2025",
        hora: "13:25",
        horaFin: "15:25",
        equipos: [
            {
                ...equipos.find((equipo) => equipo.id === 3),
                puntuacion: 0
            },
            {
                ...equipos.find((equipo) => equipo.id === 4),
                puntuacion: 0
            }
        ]
    },
    {
        id: 10,
        fecha: "16-05-2025",
        hora: "11:10",
        horaFin: "13:10",
        equipos: [
            {
                ...equipos.find((equipo) => equipo.id === 3),
                puntuacion: 4
            },
            {
                ...equipos.find((equipo) => equipo.id === 1),
                puntuacion: 1
            }
        ]
    },
    {
        id: 11,
        fecha: "30-04-2026",
        hora: "11:10",
        horaFin: "19:10",
        equipos: [
            {
                ...equipos.find((equipo) => equipo.id === 3),
                puntuacion: 4
            },
            {
                ...equipos.find((equipo) => equipo.id === 1),
                puntuacion: 1
            }
        ]
    },*/
    {
        id: 12,
        fecha: "16-05-2026",
        hora: "16:00",
        horaFin: "17:15",
        equipos: [
            {
                ...equipos.find((equipo) => equipo.id === 10),
                puntuacion: 0
            },
            {
                ...equipos.find((equipo) => equipo.id === 5),
                puntuacion: 0
            }
        ]
    },
    {
        id: 13,
        fecha: "16-05-2026",
        hora: "17:15",
        horaFin: "18:30",
        equipos: [
            {
                ...equipos.find((equipo) => equipo.id === 10),
                puntuacion: 0
            },
            {
                ...equipos.find((equipo) => equipo.id === 6),
                puntuacion: 0
            }
        ]
    },
    {
        id: 14,
        fecha: "16-05-2026",
        hora: "18:30",
        horaFin: "19:45",
        equipos: [
            {
                ...equipos.find((equipo) => equipo.id === 10),
                puntuacion: 0
            },
            {
                ...equipos.find((equipo) => equipo.id === 7),
                puntuacion: 0
            }
        ]
    },
    {
        id: 15,
        fecha: "16-05-2026",
        hora: "19:45",
        horaFin: "21:00",
        equipos: [
            {
                ...equipos.find((equipo) => equipo.id === 9),
                puntuacion: 0
            },
            {
                ...equipos.find((equipo) => equipo.id === 8),
                puntuacion: 0
            }
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
    const [day, month, year] = fecha.split("-").map(Number);
    const [hours, minutes] = hora.split(":").map(Number);
    return new Date(year, month - 1, day, hours, minutes);
}

/**
 * Retorna el estado del partido: "proximo", "en-juego", o "finalizado"
 */
export function estadoPartido(partido) {
    const ahora = new Date();
    const inicio = partidoToDate(partido.fecha, partido.hora);
    const fin = partidoToDate(partido.fecha, partido.horaFin);

    if (ahora < inicio) return "proximo";
    if (ahora >= inicio && ahora < fin) return "en-juego";
    return "finalizado";
}

/**
 * Determina si un partido ya se ha jugado en función de su fecha y hora.
 * Se considera jugado si la fecha+hora del partido es anterior a "ahora".
 *
 * @param {{ fecha: string, hora: string }} partido
 * @returns {boolean}
 */
export function partidoYaJugado(partido) {
    return estadoPartido(partido) === "finalizado";
}

export function formatearFechaCorta(fecha) {
    const [day, month] = fecha.split("-");
    return `${day}/${month}`;
}

export default partidos;