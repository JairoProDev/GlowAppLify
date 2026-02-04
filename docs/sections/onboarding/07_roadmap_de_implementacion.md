## 🎯 PARTE 8: ROADMAP DE IMPLEMENTACIÓN

### FASE 1: CORE ONBOARDING (Semana 1)

**Día 1-2: Setup & Arquitectura**
- [ ] Setup Next.js project con App Router
- [ ] Configurar Tailwind + Shadcn/UI
- [ ] Setup Supabase Auth
- [ ] Crear database schema
- [ ] Deploy a Vercel (hello world)

**Día 3-4: UI Components**
- [ ] Crear componente `ProgressBar`
- [ ] Crear componente `BloomAIBubble`
- [ ] Crear componente `StepContainer`
- [ ] Crear componente `ContinueButton`
- [ ] Crear componente `QuickPicks`

**Día 5-7: Onboarding Flow**
- [ ] Implementar Step 1: Goal input
- [ ] Implementar Step 2: Context selection
- [ ] Implementar Step 3: Past attempts
- [ ] Implementar Step 4: Future Self
- [ ] Conectar steps con Zustand state
- [ ] Validación de cada step

**Deliverable:** Onboarding flow funcional (sin AI backend aún)

---

### FASE 2: AI INTEGRATION (Semana 2)

**Día 8-9: Claude API Setup**
- [ ] Crear cuenta Anthropic
- [ ] Configurar API keys en Vercel
- [ ] Crear API route `/api/board/generate`
- [ ] Escribir prompt v1
- [ ] Test manual (10+ variaciones)

**Día 10-11: Backend Logic**
- [ ] Conectar onboarding form → API route
- [ ] Parsear respuesta de Claude
- [ ] Guardar board en Supabase
- [ ] Error handling (API fails, parsing fails)
- [ ] Loading state con tips rotatorios

**Día 12-14: Board Reveal**
- [ ] Diseñar Board Reveal UI
- [ ] Animación de confetti
- [ ] Preview de las 5 layers
- [ ] CTAs (View Full Board / Do First Action)
- [ ] Redirect logic

**Deliverable:** Onboarding completo end-to-end con IA

---

### FASE 3: POLISH & OPTIMIZACIÓN (Semana 3)

**Día 15-17: UX Refinement**
- [ ] Animaciones suaves (Framer Motion)
- [ ] Auto-focus en inputs
- [ ] Keyboard navigation (Enter = Continue)
- [ ] Mobile responsive (todo el flow)
- [ ] Error states (validation, API errors)
- [ ] Empty states
- [ ] Exit intent popup ("Wait! You're 75% done...")

**Día 18-19: Analytics**
- [ ] Setup PostHog
- [ ] Track all events (step viewed, completed, abandoned)
- [ ] Funnel visualization
- [ ] Cohort analysis setup
- [ ] Event properties (time spent, answers, etc.)

**Día 20-21: Testing**
- [ ] Test con 10 personas reales
- [ ] Gather feedback (survey after onboarding)
- [ ] Fix bugs críticos
- [ ] Refinar prompt basado en boards generados
- [ ] A/B test Step 2 variations (if time)

**Deliverable:** Onboarding pulido y testeado

---

### FASE 4: ITERATION (Mes 2+)

**Basado en data:**
- Identificar step con mayor drop-off → Simplificar
- Identificar preguntas confusas → Reescribir
- Identificar tiempo promedio → Optimizar si >5 min
- A/B tests de tono, longitud, visuales

**Objetivo:** 80%+ completion rate

---