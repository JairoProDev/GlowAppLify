# Plan de Evolución de Componentes (Roadmap Técnico)

Basado en el análisis competitivo, aquí está el plan táctico de implementación para llevar cada componente al nivel "Mundial".

## 📅 Calendar 2.0: "Quantum Calendar"
**Objetivo:** Convertir el calendario en un centro de comando de tiempo y energía.

### Falencias Actuales (A corregir YA)
- [ ] **Creación de Eventos:** No hay forma de crear eventos haciendo clic en las celdas o botón "+".
- [ ] **Drag & Drop:** No se pueden mover eventos visualmente.
- [ ] **Visualización Real:** Los eventos son simulados, no reflejan duración real en el grid.

### Features Nivel Dios (Fase 2)
1.  **Time-Grid Interactivo:** Implementar `react-big-calendar` o `@fullcalendar/react` (o una versión custom muy robusta) que soporte selección de rangos, drag and drop y resize.
2.  **Sincronización:** Integrar Google Calendar API (Lectura/Escritura).
3.  **Vistas Múltiples:** Día, 3-Días (Focus), Semana, Mes, Agenda.
4.  **Quick Add (NLP):** Input tipo "Gym mañana a las 7am" -> Parsea y crea el evento.

---

## 📝 Notes 2.0: "Cognitive Nexus"
**Objetivo:** Un sistema de gestión de conocimiento que conecta ideas con acción.

### Falencias Actuales
- [ ] Editor de texto plano es insuficiente.
- [ ] No hay organización por carpetas o tags funcionales.

### Features Nivel Dios (Fase 2)
1.  **Editor WYSIWYG Avanzado:** Migrar a `Tiptap` o `Plate.js`. Soporte para negritas, listas, checklist, código, citas.
2.  **Estructura Jerárquica:** Sidebar con carpetas anidables y favoritos.
3.  **Backlinks [[Wikilinks]]:** Sistema de enlace interno entre notas.
4.  **Templates:** Botones rápidos para crear: "Diario de Gratitud", "Meeting Notes", "Project Plan".

---

## ✅ Task Master 2.0: "Flow Engine"
**Objetivo:** Eliminar la fricción de la gestión de tareas.

### Falencias Actuales
- [ ] Solo vista Kanban básica.
- [ ] Falta de subtareas y dependencias.

### Features Nivel Dios (Fase 2)
1.  **Vistas Flexibles:** Switch entre Kanban, Lista (tipo Linear), y Calendario.
2.  **Subtareas Anidadas:** Estructura de árbol infinita.
3.  **Smart Recurring:** "Cada lunes", "El último viernes del mes".
4.  **Task Snooze:** "Ocultar hasta mañana".
5.  **Focus Mode:** Una vista inmersiva para la tarea actual con timer y bloqueador de distracciones.

---

## ⚙️ Settings & System (Core Fixes)
**Objetivo:** Robustez y personalización total.

### Prioridad Máxima (Fix Now)
- [ ] **Settings Page:** Actualmente placeholder. Implementar:
    - Perfil de usuario (Avatar, Nombre).
    - Preferencias de Tema (Dark, Light, System, Custom Accents).
    - Notificaciones (Email, Push).
    - Data Management (Export JSON, Clear Data).
- [ ] **New Routine Button:** El botón en `/routines` no hace nada. Implementar un Wizard (Dialog) para crear una ritual paso a paso.
- [ ] **Global Search:** Mejorar indexación. Que busque dentro del *contenido* de las notas y las descripciones de tareas.

---

## 🔄 Rutinas 2.0: "Ritual Architect"
**Objetivo:** Automatizar el éxito personal.

### Features Nivel Dios
1.  **Routine Wizard:** Un constructor visual paso a paso para diseñar rutinas.
2.  **Audio Inmersivo:** Integrar sonidos binaurales o música lo-fi de fondo en el `RoutinePlayer`.
3.  **Streak Protection:** Lógica avanzada de rachas (días de descanso planificados).
4.  **Social Routines:** Compartir rutinas con la comunidad (exportar/importar códigos de rutina).

---

## 📊 Analytics 2.0: "Life Dashboard"
**Objetivo:** Insights accionables, no solo gráficos bonitos.

### Features Nivel Dios
1.  **Correlaciones:** "¿Mis días más productivos coinciden con mis días de dormir 8 horas?" (Cruce de datos Journal vs Tasks).
2.  **Weekly Review Automatizado:** Un reporte generado cada domingo con resumen de logros y áreas de mejora.
3.  **Wheel of Life Interactiva:** Evaluación mensual visual de áreas de vida.

---

## Plan de Ejecución Inmediata (Siguientes Pasos)
1.  **Reparar:** Settings y Creación de Rutinas.
2.  **Calendar Core:** Implementar interactividad básica (Crear evento al click).
3.  **Notes Core:** Mejorar editor visualmente.
4.  **Tasks Core:** Añadir vista de lista.
