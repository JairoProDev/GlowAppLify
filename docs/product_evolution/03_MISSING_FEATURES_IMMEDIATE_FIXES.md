# Reporte de Errores y Faltantes Críticos (Hotfix Plan)

Este documento lista las funcionalidades que el usuario reportó explícitamente como "rotas" o ausentes, y el plan técnico para solucionarlas de inmediato.

## 🔴 Prioridad 1: Funcionalidad Rota/Inexistente

### 1. Página de Ajustes (`/settings`)
*   **Estado Actual:** Placeholder estático ("Coming Soon" o vacío).
*   **Problema:** El usuario no puede configurar su experiencia, exportar datos ni gestionar su cuenta.
*   **Solución:** Implementar `SettingsPage` real con las siguientes secciones:
    *   **Account:** Avatar uploader, Name input.
    *   **Appearance:** Selector de Tema (System/Dark/Light) y Color de Acento (Primary Color picker).
    *   **Data:** Botones "Exportar Todo a JSON" (Backup) y "Borrar Datos Locales".
    *   **Language:** Selector explícito de idioma global.

### 2. Botón "New Routine" (`/routines`)
*   **Estado Actual:** El botón existe visualmente pero `onClick` no dispara ninguna acción o solo muestra un log.
*   **Problema:** No se pueden crear nuevas rutinas personalizadas, limitando al usuario a las 2 por defecto.
*   **Solución:**
    *   Crear componente `RoutineWizardDialog`.
    *   Pasos del Wizard:
        1.  Nombre y Descripción.
        2.  Tipo (Morning/Evening/Work).
        3.  Constructor de Pasos (Lista dinámica: Título + Duración).
    *   Conectar al store `useRoutineStore.addRoutine`.

### 3. Creación de Eventos en Calendario (`/calendar`)
*   **Estado Actual:** TimeGrid es solo lectura. Muestra tareas existentes (simuladas) pero no permite interacción.
*   **Problema:** Un calendario donde no puedes agendar es inútil.
*   **Solución:**
    *   Agregar `onClick` a las celdas del Grid.
    *   Abrir un `EventDialog` o `TaskDialog` pre-llenado con la fecha/hora seleccionada.
    *   Guardar como una Tarea con `deadline` específico (o crear un store paralelo de Eventos si queremos separarlos, por ahora unificaremos en Tareas con fecha/hora).

### 4. Global Search (`Cmd+K`)
*   **Estado Actual:** Implementado pero básico.
*   **Problema:** El usuario mencionó "me parece que el buscador no funciona". Posiblemente no indexa correctamente o la interacción no es clara.
*   **Solución:** Revisar la lógica de filtrado. Asegurar que busca en TODOS los stores (Tasks, Notes, Routines). Añadir feedback visual si no hay resultados.

---

## 🟠 Prioridad 2: Mejoras de UX Mencionadas
1.  **Scroll Excesivo:**
    *   *Solucionado:* Se implementaron Tabs en Execution Board. (Verificar si quedan otras áreas largas).
2.  **Idioma Español:**
    *   *Estado:* Se implementó toggle, pero el usuario dijo "no veo donde cambiar".
    *   *Acción:* Mover el selector a un lugar más persistente (Sidebar o TopBar) o hacerlo más visible en Settings. Asegurar que las traducciones cubran TODA la UI (Sidebar, Placeholders, Títulos de páginas).

## Plan de Acción Inmediato (Siguiente Prompt)
Al recibir aprobación de este análisis, procederemos en este orden:
1.  **Settings Page:** Construcción completa.
2.  **Routine Wizard:** Implementación funcional.
3.  **Calendar Interactions:** Hacer el grid interactivo.
