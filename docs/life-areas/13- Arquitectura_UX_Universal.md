
## 13. Arquitectura UX Universal

### 13.1 Los 3 Momentos de Uso

**Momento 1 — Daily Check-in (matutino, 3-5 minutos):**
- ¿Cómo me siento hoy? (Mood & Energy — Bienestar Mental)
- ¿Cómo dormí? (Sleep — Salud Física)
- ¿Cuál es mi One Thing del día? (Carrera)
- ¿Qué hábitos tengo hoy? (Vista de todos los hábitos del día)
- Insight del Coach IA basado en los datos de ayer

**Momento 2 — During Day (micro-interacciones, <30 segundos cada una):**
- Marcar hábito completado
- Registrar sesión de Deep Work (inicio/fin)
- Capturar idea en el Inbox universal
- Registrar un gasto o ingreso significativo
- Marcar una tarea completada

**Momento 3 — Weekly Review (30 minutos, idealmente domingo/lunes):**
- Revisión completa de todas las áreas
- Análisis de la IA con insights transversales
- Planificación de la semana siguiente
- Ajuste de prioridades

### 13.2 Principios de UX No Negociables

**Mobile-First para Input:** Cualquier dato debe poderse capturar en <3 segundos desde el teléfono. El friccionamiento mata los hábitos de registro.

**Desktop-First para Análisis:** Los dashboards de métricas profundas, las vistas de tendencias y las sesiones de planificación son desktop-first, donde hay pantalla suficiente para la complejidad.

**La IA habla primero:** En lugar del usuario buscar qué hacer, la IA propone activamente. El usuario reacciona (acepta/ajusta/rechaza), no inicia.

**Visibilidad vs. Abrumamiento:** El dashboard principal muestra el resumen de todas las áreas, pero el detalle está un nivel adentro. No bombardeamos con información; mostramos el estado y permitimos la exploración.

**Celebración significativa:** Cuando el usuario logra un hito importante (termina un libro, alcanza un KR, cumple X días de racha), la celebración es contextual y específica, no genérica ("¡Completaste tu objetivo de leer 'Atomic Habits'! Esta fue la idea que marcaste como más importante: [idea]. ¿Ya la aplicaste?").

**Fricción intencional:** Para acciones de alto impacto y permanentes (eliminar un objetivo, borrar historial), añadir un paso de confirmación que haga pensar. La facilidad de deshacer trabajo genera comportamiento impulsivo.

### 13.3 La Vista de Área Individual (Diseño Funcional)

Cada área tiene exactamente esta estructura:

```
[Header: Icono + Nombre + Status Badge (Active/Maintenance/Inactive)]
[Última actividad] [Botón Configurar]

┌─────────────────────────────────┐ ┌────────────────────┐
│                                 │ │                    │
│    OBJETIVO ACTIVO (OKR 90D)   │ │   HEALTH SCORE     │
│    [Descripción del objetivo]   │ │   [Visual: X/100]  │
│                                 │ │                    │
│    KR 1: ██████░░ 60%          │ │   RACHA            │
│    KR 2: ████░░░░ 40%          │ │   [X días]         │
│    KR 3: ██░░░░░░ 20%          │ │                    │
│                                 │ │   TENDENCIA        │
│    [Botón: Ver Detalle]         │ │   [↑ / ↓ / →]     │
└─────────────────────────────────┘ └────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                                                         │
│              PERSPECTIVA DEL COACH IA                   │
│   "Texto proactivo con insight específico del área"     │
│   [Botón: Pregunta a Bloom →]                           │
│                                                         │
└─────────────────────────────────────────────────────────┘

[Tabs: Acciones | Hábitos | Métricas | Historial | Notas]

[Contenido según tab activo]
