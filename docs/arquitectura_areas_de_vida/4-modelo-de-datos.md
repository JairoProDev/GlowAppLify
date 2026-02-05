

## 🗄️ MODELO DE DATOS

### Estructura de Base de Datos

#### 1. Tabla: `users`
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  name VARCHAR(255),
  created_at TIMESTAMP,
  onboarding_completed BOOLEAN DEFAULT FALSE,
  timezone VARCHAR(50),
  preferences JSONB -- { theme: 'dark', notifications: {...} }
);
```

#### 2. Tabla: `life_areas`
```sql
CREATE TABLE life_areas (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  area_type VARCHAR(50), -- 'finances', 'health', 'learning', etc.
  status VARCHAR(20), -- 'principal', 'active', 'maintenance', 'inactive'
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

#### 3. Tabla: `objectives`
```sql
CREATE TABLE objectives (
  id UUID PRIMARY KEY,
  life_area_id UUID REFERENCES life_areas(id),
  title VARCHAR(255), -- "Perder 10kg en 90 días"
  description TEXT,
  smart_goal JSONB, -- { specific: "...", measurable: "...", ... }
  deadline DATE,
  status VARCHAR(20), -- 'active', 'completed', 'abandoned'
  progress_percentage INTEGER, -- 0-100
  kpis JSONB, -- [{ name: "Peso", current: 78, target: 70, unit: "kg" }]
  created_at TIMESTAMP,
  completed_at TIMESTAMP
);
```

#### 4. Tabla: `actions`
```sql
CREATE TABLE actions (
  id UUID PRIMARY KEY,
  objective_id UUID REFERENCES objectives(id),
  life_area_id UUID REFERENCES life_areas(id), -- Puede no tener objetivo (mantenimiento)
  title VARCHAR(255), -- "Gym 3x/semana"
  description TEXT,
  action_type VARCHAR(20), -- 'weekly_recurring', 'daily_habit', 'one_time'
  frequency JSONB, -- { type: 'weekly', days: ['Mon', 'Wed', 'Fri'], time: '18:00' }
  estimated_duration INTEGER, -- minutos
  priority INTEGER, -- 1 (highest) - 5 (lowest)
  status VARCHAR(20), -- 'active', 'paused', 'completed'
  created_at TIMESTAMP
);
```

#### 5. Tabla: `daily_logs`
```sql
CREATE TABLE daily_logs (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  date DATE,
  actions_completed JSONB, -- [{ action_id: '...', completed_at: '...' }]
  mood VARCHAR(20), -- 'great', 'good', 'okay', 'struggling'
  reflection TEXT,
  energy_level INTEGER, -- 1-10
  created_at TIMESTAMP
);
```

#### 6. Tabla: `ai_interactions`
```sql
CREATE TABLE ai_interactions (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  interaction_type VARCHAR(50), -- 'weekly_review', 'chat', 'adjustment', 'obstacle_detection'
  context JSONB, -- Datos relevantes para la conversación
  ai_suggestion TEXT,
  user_response TEXT,
  outcome VARCHAR(50), -- 'accepted', 'rejected', 'modified'
  created_at TIMESTAMP
);
```

#### 7. Tabla: `area_connections`
```sql
CREATE TABLE area_connections (
  id UUID PRIMARY KEY,
  area_1_id UUID REFERENCES life_areas(id),
  area_2_id UUID REFERENCES life_areas(id),
  connection_type VARCHAR(20), -- 'synergy', 'conflict', 'dependency'
  description TEXT, -- "Gym membership impacta presupuesto"
  detected_by VARCHAR(20), -- 'ai', 'user'
  created_at TIMESTAMP
);
```

### Relaciones Clave

```
users (1) ────── (∞) life_areas
  │
  └────────────── (∞) daily_logs
  └────────────── (∞) ai_interactions

life_areas (1) ─── (∞) objectives
  │
  └────────────── (∞) actions

objectives (1) ─── (∞) actions

life_areas (∞) ─── (∞) area_connections
```

---