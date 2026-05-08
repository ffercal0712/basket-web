# Manual de la página web — 2º Torneo OKSAP · Veteranos Basket 2026

Este documento explica cómo funciona la página, qué puede hacer un administrador y, en especial, cómo funciona todo el sistema de partidos.

---

## Índice

1. [Qué hay en la página](#1-qué-hay-en-la-página)
2. [Los equipos](#2-los-equipos)
3. [Los partidos: cómo funcionan](#3-los-partidos-cómo-funcionan)
4. [Los tres estados de un partido](#4-los-tres-estados-de-un-partido)
5. [Qué pasa cuando un partido pasa de un estado a otro](#5-qué-pasa-cuando-un-partido-pasa-de-un-estado-a-otro)
6. [Acceso de administrador](#6-acceso-de-administrador)
7. [Panel de edición de partidos](#7-panel-de-edición-de-partidos)
8. [Qué se puede editar en cada partido](#8-qué-se-puede-editar-en-cada-partido)
9. [Cómo introducir o corregir un resultado](#9-cómo-introducir-o-corregir-un-resultado)
10. [Cómo asignar los equipos del domingo](#10-cómo-asignar-los-equipos-del-domingo)
11. [Los cambios se sincronizan solos](#11-los-cambios-se-sincronizan-solos)
12. [El listado de partidos en la página de inicio](#12-el-listado-de-partidos-en-la-página-de-inicio)
13. [La sección de clasificación final](#13-la-sección-de-clasificación-final)
14. [Preguntas frecuentes](#14-preguntas-frecuentes)

---

## 1. Qué hay en la página

La página tiene las siguientes secciones accesibles desde el menú:

| Sección | Dirección | Qué muestra |
|---|---|---|
| Inicio | `/` | Próximos partidos o últimos resultados, clasificación final (cuando procede), ubicación, normativa, vídeo |
| Equipos | `/equipos` | Tarjetas con todos los equipos inscritos |
| Partidos | `/partidos` | Todos los partidos del torneo con su estado actual |
| Admin | `/admin` | Acceso privado para gestionar los partidos |

Cada partido tiene también su propia página de detalle (por ejemplo `/partidos/1`) con información completa: equipos, escudos, marcador y fase del torneo.

---

## 2. Los equipos

Hay **8 equipos** inscritos. Cada equipo tiene:

- **Nombre completo**
- **Escudo** (logo), si lo tienen
- **Identificador** interno que se usa en las URLs (por ejemplo, `unicaja-master-55`)

Los equipos están guardados en un archivo de datos interno. Para cambiar el nombre o el escudo de un equipo habría que editar ese archivo directamente (no se puede hacer desde el panel de administración).

---

## 3. Los partidos: cómo funcionan

Hay **8 partidos** en total: 4 el sábado y 4 el domingo.

Cada partido tiene guardada esta información:

- **Fecha** (día-mes-año, por ejemplo `16-05-2026`)
- **Hora de inicio** (por ejemplo `16:00`)
- **Hora de fin** (por ejemplo `17:15`)
- **Fase del torneo** (por ejemplo "Jornada del sábado", "Final del torneo")
- **Los dos equipos** que juegan, con sus nombres y escudos
- **La puntuación** de cada equipo (puede estar vacía si aún no ha terminado)

---

## 4. Los tres estados de un partido

La página comprueba en todo momento la fecha y hora actuales y **clasifica automáticamente** cada partido en uno de estos tres estados:

### "Próximamente"

El partido todavía **no ha empezado**. La hora actual es anterior a la hora de inicio del partido.

Se muestra como una etiqueta azul/oscura en la tarjeta del partido.

### "En juego"

El partido está **en marcha ahora mismo**. La hora actual está entre la hora de inicio y la hora de fin del partido.

Se muestra como una etiqueta verde pulsante en la tarjeta del partido.

### "Finalizado"

El partido **ya ha terminado**. La hora actual es posterior a la hora de fin del partido.

Aquí pueden ocurrir tres cosas:

- **Con resultado introducido:** Se muestran los marcadores finales. Si hay un ganador, la tarjeta lo resalta visualmente. Si hay empate, aparece la etiqueta "Empate".
- **Sin resultado todavía:** Aparece la etiqueta "Resultado pendiente". El partido ha terminado según el horario, pero todavía no se ha introducido el marcador.

---

## 5. Qué pasa cuando un partido pasa de un estado a otro

Todo esto ocurre **solo**, sin que nadie tenga que hacer nada. La página lo gestiona comparando la hora del reloj con los horarios programados.

### De "Próximamente" → "En juego"

Ocurre exactamente cuando llega la hora de inicio del partido. No hay ninguna acción manual necesaria.

### De "En juego" → "Finalizado"

Ocurre cuando pasa la hora de fin del partido.

Aunque el partido haya terminado, el marcador no se pone solo: alguien con acceso de administrador tiene que **introducirlo manualmente** en el panel.

### Refresco de la página

La página no necesita recargarse para detectar estos cambios de estado. Sin embargo, si se deja abierta mucho tiempo sin interacción, puede ser conveniente recargar.

---

## 6. Acceso de administrador

El acceso de administrador sirve para **gestionar todos los partidos**: introducir resultados, cambiar fechas y horas, asignar equipos y corregir cualquier dato.

### Cómo acceder

1. Ir a la dirección `/admin`
2. Introducir el **PIN de administrador** en el campo de contraseña
3. Pulsar "Entrar como admin"
4. Si el PIN es correcto, la sesión queda activa

### Duración de la sesión

La sesión de administrador **dura mientras el navegador esté abierto**. Si se cierra el navegador o la pestaña y se vuelve a abrir, habrá que introducir el PIN de nuevo.

### Cerrar sesión

En la página de partidos aparece un botón "Cerrar sesión admin". También se puede hacer desde la página `/admin` una vez dentro.

### Si el PIN es incorrecto

Se muestra un mensaje de error. No hay bloqueo automático por intentos fallidos.

Si durante una sesión activa el PIN deja de funcionar, la sesión se cierra automáticamente y hay que volver a entrar.

---

## 7. Panel de edición de partidos

Una vez con la sesión activa, al ir a la sección de **Partidos** (`/partidos`) la vista cambia completamente respecto a lo que ve el público. En lugar de los bloques de próximos y finalizados, aparece una sección **"Editar partidos"** con los **8 partidos del torneo** en una cuadrícula, todos editables.

Cada tarjeta tiene un botón **"Editar partido"** que despliega el formulario de edición.

---

## 8. Qué se puede editar en cada partido

Al pulsar "Editar partido" en cualquier tarjeta, se abre un formulario con estos campos:

| Campo | Para qué sirve |
|---|---|
| Fecha | Cambiar el día del partido |
| Hora inicio | Cambiar la hora a la que empieza |
| Hora fin | Cambiar la hora a la que termina (afecta al estado automático) |
| Título | El nombre de la fase, por ejemplo "Final del torneo" |
| Equipo local | Cambiar qué equipo juega como local |
| Equipo visitante | Cambiar qué equipo juega como visitante |
| Resultado local | El marcador del equipo local |
| Resultado visitante | El marcador del equipo visitante |

Cuando todo esté rellenado, pulsar **"Guardar cambios"**. Si algo falla, aparece un mensaje de error debajo del formulario.

Para **cerrar el formulario sin guardar**, pulsar "Cerrar edición".

---

## 9. Cómo introducir o corregir un resultado

### Introducir un resultado nuevo

1. Acceder como administrador (ver sección 6)
2. Ir a Partidos (`/partidos`)
3. Localizar el partido y pulsar **"Editar partido"**
4. Rellenar "Resultado local" y "Resultado visitante"
5. Pulsar **"Guardar cambios"**

En unos 10 segundos el resultado aparece en todos los dispositivos que estén viendo la página.

### Corregir un resultado equivocado

Igual que arriba: abrir la edición, cambiar los números y guardar. El resultado anterior queda reemplazado.

### Borrar solo el marcador

Pulsar **"Limpiar resultado"** dentro del formulario de edición. Elimina los dos marcadores del partido pero deja intacto el resto (fecha, hora, equipos, título).

---

## 10. Cómo asignar los equipos del domingo

Los partidos del sábado (1 al 4) tienen equipos asignados desde el principio.

Los partidos del domingo (5 al 8) empiezan con nombres de marcador como "1º clasificado", "2º clasificado", etc., porque dependen de los resultados del sábado.

Una vez conocida la clasificación, el administrador puede **asignar los equipos reales** directamente desde el panel:

1. Entrar en modo admin y abrir la edición del partido del domingo
2. En el desplegable "Equipo local", seleccionar el equipo real correspondiente
3. En el desplegable "Equipo visitante", seleccionar el otro equipo
4. Pulsar **"Guardar cambios"**

Esto es algo que conviene hacer antes de que empiece la jornada del domingo para que los espectadores vean los nombres reales en lugar de los marcadores de clasificación.

---

## 11. Los cambios se sincronizan solos

La página está conectada a una base de datos externa. Esto significa que:

- Cuando el administrador guarda cualquier cambio, se propaga a **todos los demás dispositivos** que estén viendo la página, sin que nadie tenga que recargar.
- La sincronización ocurre **cada 10 segundos** aproximadamente.
- Si hay un problema de conexión, se muestra un aviso indicando que no se pudo conectar. En ese caso los datos pueden no ser los más recientes y los cambios no se guardarán hasta que vuelva la conexión.

---

## 12. El listado de partidos en la página de inicio

En la página de inicio hay una sección que muestra partidos de forma dinámica. Lo que aparece depende del momento en que se visita:

### Si quedan partidos por jugar

Se muestra **"Próximos partidos"** con los partidos que aún no han empezado, ordenados del más cercano al más lejano. Se muestran como máximo **4 partidos**. Si hay más, aparecen los 4 más próximos y un enlace "Ver todos los partidos →".

### Si ya se han jugado todos los partidos

La sección cambia automáticamente a **"Últimos resultados"** y muestra los **4 últimos partidos jugados**, del más reciente al más antiguo. Así la sección nunca queda vacía.

### Transición automática

Este cambio ocurre solo, sin intervención manual. La página compara los horarios con la hora actual y decide qué mostrar.

### Qué muestra cada tarjeta

Nombres de los equipos, escudos, fecha y hora, y la etiqueta de estado (Próximamente, En juego, o el marcador final). Hacer clic lleva a la página de detalle del partido.

---

## 13. La sección de clasificación final

Cuando **todos los partidos del torneo han terminado**, aparece automáticamente en la página de inicio una nueva sección llamada **"Clasificación final — Mejores equipos"** que muestra los tres equipos con mayor puntuación acumulada a lo largo de todo el torneo.

### Cuándo aparece

Esta sección **solo es visible cuando no queda ningún partido por jugar** (es decir, todos los partidos tienen estado "Finalizado"). No aparece durante el torneo ni antes de que empiece.

Si quedan partidos pendientes, la sección no se muestra aunque haya resultados parciales.

### Cómo se calcula la clasificación

Se suman **todos los puntos marcados** por cada equipo en los partidos que ya tienen resultado introducido. Se ordenan los equipos de mayor a menor puntuación total y se muestran los tres primeros con su posición (1º, 2º, 3º) y el total de puntos anotados.

### Qué ocurre si hay empate en puntos

Los empates en puntuación total no se desempatan automáticamente: la posición en el podio quedará determinada por el orden en que aparecen en los cálculos internos. Si hay que reflejar un desempate oficial, habría que ajustarlo manualmente en el código.

### Dónde aparece en la página

Justo encima de la sección de partidos (últimos resultados), para que sea lo primero que se vea al llegar a la página una vez concluido el torneo.

### Requisito para que funcione correctamente

Para que la clasificación sea correcta, es imprescindible que **todos los partidos finalizados tengan el resultado introducido** en el panel de administración. Un partido finalizado sin resultado no aporta puntos al cálculo, por lo que si falta alguno, el podio puede no ser representativo.

---

## 14. Preguntas frecuentes

**¿Qué pasa si el partido acaba antes de la hora prevista?**

La página sigue mostrando el partido como "En juego" hasta que llegue la hora de fin programada. El administrador puede acortar la hora de fin desde el panel para que pase a "Finalizado" antes.

**¿Se puede introducir el resultado de un partido antes de que termine?**

Sí. El administrador puede editar cualquier partido en cualquier momento, independientemente de su estado.

**¿Se puede cambiar la hora o fecha de un partido desde el panel de administración?**

Sí. Desde el formulario de edición de cada tarjeta se puede cambiar la fecha, la hora de inicio y la hora de fin. El estado del partido (Próximamente / En juego / Finalizado) se recalcula automáticamente con los nuevos horarios.

**¿La sección de clasificación final aparece sola o hay que hacer algo para activarla?**

Aparece sola. En cuanto no quede ningún partido por jugar, la sección se muestra automáticamente en la página de inicio. No hay que tocar nada.

**¿Qué pasa si se pierde la conexión a internet durante el torneo?**

- Los visitantes seguirán viendo los datos cargados en ese momento, pero sin actualizaciones nuevas.
- El administrador no podrá guardar cambios hasta que vuelva la conexión.
- Cuando la conexión se recupere, la página se sincronizará sola en el siguiente ciclo de 10 segundos.

**¿Puede cualquiera entrar al panel de administración?**

Solo quien tenga el PIN correcto. El PIN se verifica en el servidor cada vez que se intenta guardar un cambio, así que conocer la dirección `/admin` no es suficiente.

**¿Hay que hacer algo especial antes de que empiece el torneo?**

No hay ninguna acción técnica necesaria. Lo que sí conviene hacer durante el torneo:
- Al terminar cada partido del sábado: introducir el resultado.
- Antes de los partidos del domingo: asignar los equipos reales en los partidos 5 al 8 (ver sección 10).
- Al terminar todos los partidos: introducir los resultados pendientes para que la clasificación final sea correcta.

---

*Manual actualizado para el 2º Torneo OKSAP · Veteranos Basket 2026 — Mayo 2026*
