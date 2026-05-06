# Manual de la página web — 2º Torneo de Veteranos Fuengirola OKSAP

Este documento explica cómo funciona la página, qué puede hacer un administrador y, en especial, cómo funciona todo el sistema de partidos.

---

## Índice

1. [Qué hay en la página](#1-qué-hay-en-la-página)
2. [Los equipos](#2-los-equipos)
3. [Los partidos: cómo funcionan](#3-los-partidos-cómo-funcionan)
4. [Los tres estados de un partido](#4-los-tres-estados-de-un-partido)
5. [Qué pasa cuando un partido pasa de un estado a otro](#5-qué-pasa-cuando-un-partido-pasa-de-un-estado-a-otro)
6. [Acceso de administrador](#6-acceso-de-administrador)
7. [Panel de resultados](#7-panel-de-resultados)
8. [Cómo introducir un resultado paso a paso](#8-cómo-introducir-un-resultado-paso-a-paso)
9. [Cómo corregir o borrar un resultado](#9-cómo-corregir-o-borrar-un-resultado)
10. [Los resultados se sincronizan solos](#10-los-resultados-se-sincronizan-solos)
11. [Los partidos del domingo y los clasificados pendientes](#11-los-partidos-del-domingo-y-los-clasificados-pendientes)
12. [El listado de partidos en la página de inicio](#12-el-listado-de-partidos-en-la-página-de-inicio)
13. [Preguntas frecuentes](#13-preguntas-frecuentes)

---

## 1. Qué hay en la página

La página tiene las siguientes secciones accesibles desde el menú:

| Sección | Dirección | Qué muestra |
|---|---|---|
| Inicio | `/` | Resumen general, próximos partidos o últimos resultados, ubicación, normativa |
| Equipos | `/equipos` | Tarjetas con todos los equipos inscritos |
| Partidos | `/partidos` | Todos los partidos del torneo con su estado actual |
| Admin | `/admin` | Acceso privado para introducir resultados |

Cada partido también tiene su propia página de detalle (por ejemplo `/partidos/1`) con información completa: equipos, marcador, fase del torneo y notas.

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
- **Nota informativa** opcional
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

Se muestra como una etiqueta verde pulsante en la tarjeta del partido. Llama la atención visualmente para indicar que hay algo en directo.

### "Finalizado"

El partido **ya ha terminado**. La hora actual es posterior a la hora de fin del partido.

Aquí pueden ocurrir tres cosas:

- **Con resultado introducido:** Se muestran los marcadores finales. Si hay un ganador, la tarjeta resalta visualmente al equipo ganador. Si hay empate, aparece una etiqueta de "Empate".
- **Sin resultado todavía:** Aparece la etiqueta "Resultado pendiente". El partido ha terminado según el horario, pero todavía no se ha introducido el marcador en el panel de administración.

---

## 5. Qué pasa cuando un partido pasa de un estado a otro

Todo esto ocurre **solo**, sin que nadie tenga que hacer nada. La página lo gestiona comparando la hora del reloj con los horarios programados.

### De "Próximamente" → "En juego"

Ocurre exactamente cuando llega la hora de inicio del partido. Si el partido empieza a las 16:00, en ese momento la etiqueta cambia sola.

No hay ninguna acción manual necesaria.

### De "En juego" → "Finalizado"

Ocurre cuando pasa la hora de fin del partido. Si el partido termina a las 17:15, a partir de ese momento aparece como finalizado.

Aunque el partido haya terminado, el marcador no se pone solo: alguien con acceso de administrador tiene que **introducirlo manualmente** en el panel.

### Refresco de la página

La página no necesita recargarse para detectar estos cambios. Sin embargo, si se deja abierta mucho tiempo sin interacción, puede que sea conveniente recargar para asegurarse de que todo está al día.

---

## 6. Acceso de administrador

El acceso de administrador sirve únicamente para **introducir y gestionar los marcadores** de los partidos finalizados.

### Cómo acceder

1. Ir a la dirección `/admin` (o hacer clic en "Admin" en el menú si aparece)
2. Introducir el **PIN de administrador** en el campo de contraseña
3. Pulsar "Entrar como admin"
4. Si el PIN es correcto, la sesión queda activa y se puede ir a la sección de partidos

### Duración de la sesión

La sesión de administrador **dura mientras el navegador esté abierto**. Si se cierra el navegador o la pestaña y se vuelve a abrir, habrá que introducir el PIN de nuevo.

Si se usa el mismo navegador sin cerrarlo (por ejemplo, se minimiza el móvil y se vuelve), la sesión sigue activa.

### Cerrar sesión

En el panel de administración aparece un botón "Cerrar sesión admin" en la parte superior derecha. También se puede hacer desde la propia página `/admin` una vez dentro.

### Si el PIN es incorrecto

Si se introduce el PIN mal varias veces, simplemente se muestra un mensaje de error. No hay bloqueo automático por intentos fallidos.

Si durante una sesión activa el PIN deja de funcionar (por ejemplo, porque se cambió desde otro lado), la sesión se cierra automáticamente y hay que volver a entrar.

---

## 7. Panel de resultados

Una vez con la sesión de administrador activa, al entrar en la sección de **Partidos** (`/partidos`) aparece un panel especial en la parte superior de la página.

Este panel **solo muestra los partidos que ya han terminado** (es decir, cuya hora de fin ya ha pasado). Los partidos próximos o en juego no aparecen aquí.

Si todavía no ha terminado ningún partido, el panel muestra el mensaje: *"El panel se activará cuando haya partidos terminados."*

Para cada partido terminado, el panel muestra:

- Fecha y hora del partido
- Nombre de la fase (por ejemplo, "Jornada del sábado")
- Dos campos de texto para introducir la puntuación de cada equipo
- El estado actual: si ya tiene resultado guardado aparece un punto verde con el texto "Resultado cargado"; si no tiene, aparece "Sin resultado todavía"

---

## 8. Cómo introducir un resultado paso a paso

1. **Acceder como administrador** (ver sección 6)
2. Ir a la sección **Partidos** (`/partidos`)
3. Localizar el partido en el panel de administración (parte superior de la página)
4. **Escribir la puntuación** del equipo de la izquierda en el primer campo
5. **Escribir la puntuación** del equipo de la derecha en el segundo campo
6. Pulsar el botón **"Guardar resultado"**
7. Aparece el mensaje "Resultado guardado correctamente" si todo ha ido bien

En ese momento, el resultado queda guardado en la base de datos y se propaga automáticamente a todos los dispositivos que estén viendo la página (en unos 10 segundos, aproximadamente).

**Notas importantes:**
- Solo se aceptan números enteros (sin decimales ni letras)
- Hay que rellenar **los dos campos** para poder guardar
- Se pueden preparar varias puntuaciones antes de guardar, pero cada partido se guarda por separado

---

## 9. Cómo corregir o borrar un resultado

### Para corregir un resultado ya guardado

Simplemente **vuelve a escribir las puntuaciones correctas** en los campos del mismo partido y pulsa "Guardar resultado" de nuevo. El resultado anterior queda reemplazado.

### Para borrar un resultado completamente

Pulsa el botón **"Limpiar"** que aparece junto al botón de guardar. Esto elimina el resultado de ese partido y vuelve a aparecer como "Resultado pendiente" en la página pública.

---

## 10. Los resultados se sincronizan solos

La página está conectada a una base de datos externa. Esto significa que:

- Cuando el administrador guarda un resultado desde su móvil u ordenador, ese resultado aparece en **todos los demás dispositivos** que estén viendo la página, sin que nadie tenga que recargar.
- La sincronización ocurre **cada 10 segundos** aproximadamente.
- Si hay un problema de conexión, se muestra un aviso en la página indicando que no se pudo conectar con los datos compartidos. En ese caso, los datos que se ven pueden no ser los más recientes.

---

## 11. Los partidos del domingo y los clasificados pendientes

Los partidos del sábado (1 al 4) tienen equipos confirmados desde el principio.

Los partidos del domingo (5 al 8) dependen de los resultados del sábado. Hasta que no se jueguen los partidos del sábado y se establezca la clasificación, algunos equipos del domingo aparecen como **"pendiente de clasificación"** (por ejemplo, "7º clasificado" o "Ganador partido 2").

Estos nombres de marcador **no se actualizan automáticamente** cuando se introducen los resultados del sábado. Para sustituirlos por los nombres reales de los equipos hay que editar los datos manualmente en el código antes del domingo. Esto lo haría la persona encargada del desarrollo de la página.

---

## 12. El listado de partidos en la página de inicio

En la página de inicio hay una sección que muestra partidos de forma dinámica. Lo que aparece ahí depende del momento en que se visita la página:

### Si quedan partidos por jugar

Se muestra el apartado **"Próximos partidos"** con los partidos que aún no han empezado, ordenados del más cercano al más lejano en el tiempo. Se muestran como máximo **4 partidos**. Si hay más de 4 pendientes, aparecen los 4 más próximos y un enlace "Ver todos los partidos →" que lleva a la sección completa.

### Si ya se han jugado todos los partidos

En cuanto no queda ningún partido pendiente, la sección cambia automáticamente a **"Últimos resultados"** y muestra los **4 últimos partidos jugados**, ordenados del más reciente al más antiguo. Esto evita que la sección quede vacía una vez concluido el torneo.

### Transición automática

Este cambio entre "Próximos partidos" y "Últimos resultados" ocurre solo, sin ninguna intervención manual. La página compara los horarios programados con la hora actual y decide qué mostrar en cada momento. No hay un botón ni una configuración que haya que tocar.

### Qué muestra cada tarjeta de partido

Cada tarjeta en esta sección es idéntica a las de la sección completa de partidos: incluye los nombres de los equipos, sus escudos (si los tienen), la fecha y hora, y la etiqueta de estado (Próximamente, En juego, o el marcador final si ya hay resultado). Hacer clic en cualquier tarjeta lleva a la página de detalle de ese partido.

---

## 13. Preguntas frecuentes

**¿Qué pasa si el partido acaba antes de la hora prevista?**

La página sigue mostrando el partido como "En juego" hasta que llegue la hora de fin programada. Después pasará a "Finalizado" solo. El marcador podrá introducirse en cuanto aparezca en el panel de administración, independientemente de si el administrador lo hace antes o después.

**¿Se puede introducir el resultado de un partido antes de que termine?**

No. El panel de administración solo muestra los partidos cuya hora de fin ya ha pasado. Hasta ese momento no hay ningún campo para introducir puntuaciones.

**¿Se puede cambiar la hora o fecha de un partido desde el panel de administración?**

No. Las fechas y horas de los partidos están fijas en el código y no se pueden cambiar desde el panel. Si hubiera que modificarlas habría que hacerlo en el código.

**¿Qué pasa si se pierde la conexión a internet durante el torneo?**

- Los visitantes de la página seguirán viendo los datos que tenían cargados en ese momento, pero no recibirán actualizaciones nuevas.
- El administrador tampoco podrá guardar resultados nuevos hasta que se recupere la conexión.
- Cuando la conexión vuelva, la página se sincronizará sola en el siguiente ciclo de 10 segundos.

**¿Puede cualquiera entrar al panel de administración?**

Solo quien tenga el PIN correcto. El PIN se verifica en el servidor cada vez que se intenta guardar un resultado, así que conocer la dirección `/admin` no es suficiente.

**¿Hay que hacer algo especial antes de que empiece el torneo?**

No hay ninguna acción técnica necesaria por parte del administrador antes de que empiecen los partidos. La página gestiona sola el cambio de estados. Lo único que hay que hacer durante el torneo es **entrar al panel de administración e introducir los marcadores** cuando los partidos vayan terminando.

---

*Manual generado para el 2º Torneo de Veteranos Fuengirola OKSAP — Mayo 2026*
