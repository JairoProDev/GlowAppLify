
## 5. Área 2: Salud Física — Máquina Biológica

### 5.1 El Problema Específico

Las apps de fitness (MyFitnessPal, Strava, Fitbod) tratan el cuerpo como un objetivo estético o atlético aislado. No conectan el rendimiento físico con el rendimiento cognitivo, emocional y financiero. No entienden que la salud física es **la base de todo lo demás** — sin energía biológica, el resto del sistema colapsa.

### 5.2 Frameworks Específicos de Salud Física

#### A. La Pirámide de Rendimiento Físico (Evidence-Based)
Orden de prioridad basado en evidencia científica (Haff & Triplett, 2016; Walker, 2017):

```
1. SUEÑO (Base absoluta — sin esto nada funciona)
2. NUTRICIÓN (Combustible del sistema)
3. EJERCICIO ESTRUCTURADO (Optimización del hardware)
4. RECUPERACIÓN ACTIVA (Mantenimiento del sistema)
5. BIOHACKING (Optimización avanzada)
```

**Por qué este orden importa:** El 90% de las personas invierte en el ejercicio (capa 3) ignorando el sueño (capa 1) y la nutrición (capa 2). La IA de GlowApplify detecta este error y reordena prioridades.

#### B. Entrenamiento por Bloques (Periodización)
**Evidencia científica:** La periodización (Block Periodization de Verkhoshansky, Linear Periodization de Selye's GAS) es el método más validado científicamente para el progreso atlético sostenible.

**Estructura:**
- **Bloque de Acumulación:** Volumen alto, intensidad moderada (4-6 semanas)
- **Bloque de Transmutación:** Volumen moderado, intensidad alta (3-4 semanas)
- **Bloque de Realización:** Volumen bajo, intensidad máxima (1-2 semanas)
- **Deload:** Recuperación activa (1 semana cada 4-6 semanas)

**En GlowApplify:** La IA gestiona automáticamente el bloque de entrenamiento activo del usuario, ajustando el volumen/intensidad semana a semana basándose en el feedback de fatiga y rendimiento.

#### C. Crononutrición y Alimentación por Objetivos
**Evidencia científica:** Investigación de Satchin Panda (2022) sobre Time-Restricted Eating; investigación de Stuart Phillips sobre proteína para síntesis muscular.

**Principios aplicados:**
- Ingesta de proteína: 1.6-2.2g/kg de peso corporal para preservar/construir masa muscular
- Ventana de alimentación optimizada para el cronotipo del usuario
- Pre/post-entreno con timing basado en evidencia

**En GlowApplify:** No reemplazamos a MyFitnessPal, sino que integramos macros simples (proteína, calorías totales) con el contexto del plan de entrenamiento.

#### D. Optimización del Sueño — El Protocolo Walker
**Evidencia científica:** "Why We Sleep" de Matthew Walker (2017), respaldado por más de 800 estudios. El sueño es la intervención de rendimiento más poderosa disponible.

**Las métricas clave:**
- Duración: 7-9 horas para adultos
- Consistencia: Mismo horario 7 días/semana (el "jet lag social" destruye la calidad)
- Calidad: Suficiente sueño REM (consolidación emocional) y Sueño Profundo (recuperación física)
- Temperatura: 18-19°C ambiente ideal para el inicio del sueño

**En GlowApplify:** El módulo de sueño es el primero que se configura en Salud Física, porque es la base. Se registra calidad subjetiva (1-10) y, si el usuario tiene wearable, se puede integrar datos objetivos.

#### E. HRV (Heart Rate Variability) como Indicador de Readiness
**Evidencia científica:** El HRV es el biomarcador más validado de readiness al entrenamiento y estrés del sistema nervioso autónomo (Plews et al., 2013).

**En GlowApplify:** Si el usuario tiene wearable (o dispositivo de HRV), la métrica de HRV determina la recomendación de entrenamiento del día:
- HRV alta (verde): Entrenamiento de alta intensidad
- HRV media (amarillo): Entrenamiento moderado
- HRV baja (rojo): Recuperación activa o descanso

#### F. Compound Effect del Ejercicio — Los "Big 3"
**Evidencia:** Los 3 tipos de ejercicio con el mayor ROI para salud y rendimiento cognitivo (Ratey, "Spark", 2008):
1. **Fuerza:** Preserva masa muscular, densidad ósea, metabolismo y función cognitiva
2. **Cardio (Zona 2):** Mitocondrias, longevidad, eficiencia cardíaca, neuroplasticidad
3. **Movilidad/Flexibilidad:** Prevención de lesiones, salud articular, longevidad del sistema

### 5.3 Herramientas Específicas del Módulo de Salud Física

#### 🔧 Readiness Dashboard
**Qué hace:** Al inicio de cada día, el usuario (o su wearable automáticamente) registra 3-5 métricas de readiness:
- Calidad del sueño (1-10 subjetivo o datos de wearable)
- Nivel de energía al despertar (1-10)
- Dolor o molestias musculares (0-10)
- HRV (si disponible)

La IA calcula un **Readiness Score** y genera la recomendación de entrenamiento del día.

#### 🔧 Training Log y Program Tracker
**Qué hace:** Registra sesiones de entrenamiento con volumen (series × repeticiones × peso) y percepción del esfuerzo (RPE 1-10).

**Funcionalidades:**
- Seguimiento de progresión por ejercicio (evolución del 1RM estimado)
- Detección de mesetas (sin progresión en 3+ sesiones)
- Alertas de sobreentrenamiento (volumen excede capacidad de recuperación)
- Biblioteca de ejercicios con instrucciones correctas

#### 🔧 Nutrición Simplificada (No una App de Calorías Completa)
**Filosofía:** No queremos ser MyFitnessPal. Queremos capturar lo que realmente importa:
- Ingesta de proteína diaria (la métrica más importante)
- Hidratación
- Calidad general de la alimentación (1-10 subjetivo)
- Restricción/ventana de alimentación (Time-Restricted Eating)

**Por qué:** El seguimiento obsesivo de calorías genera relaciones disfuncionales con la comida y no es sostenible. El seguimiento de proteína + calidad general da el 80% del beneficio con el 20% del esfuerzo.

#### 🔧 Sleep Optimizer
**Qué hace:** Registra y analiza patrones de sueño.
**Entradas:** Hora de dormir, hora de despertar, calidad subjetiva (1-10), factores que afectaron el sueño (alcohol, cafeína tardía, estrés, pantallas)
**Salidas:** Tendencias de sueño, correlaciones entre calidad del sueño y rendimiento en otras áreas (la IA detecta: "Cuando duermes <7h, tu tasa de completitud de tareas cae un 30%")

#### 🔧 Recovery Tracker
**Qué hace:** Gestiona la recuperación activa como elemento tan importante como el entrenamiento.
- Sesiones de estiramiento/yoga/movilidad
- Baños de contraste/frío (Wim Hof — evidencia en reducción de inflamación)
- Masaje o foam rolling
- Tiempo en naturaleza (evidencia en reducción de cortisol)

#### 🔧 Body Composition Timeline
**Qué hace:** Registra métricas corporales claves (peso, medidas, fotos progresivas — privadas) y proyecta tendencias.
**Filosofía:** No es una herramienta de "pesaje obsesivo". Las mediciones son mensuales, no diarias, para evitar el ruido estadístico del peso diario y el comportamiento compulsivo.

### 5.4 Conexiones Clave con Otras Áreas

- **Sueño → Carrera:** La IA alerta cuando el sueño promedio cae, predictiendo baja en productividad cognitiva
- **Ejercicio → Bienestar Mental:** El ejercicio aumenta BDNF y serotonina. La IA prioriza el ejercicio cuando detecta señales de estrés elevado
- **Nutrición → Finanzas:** Gasto en alimentación saludable vs. comida rápida analizado en el contexto financiero
- **Readiness → Calendario:** El Readiness Score informa la dificultad de las tareas cognitivas programadas para ese día

---
