# Panel Web de Supervisión - Registro de Kilómetros v1.0.0

Panel web para supervisores que permite gestionar, validar y reportar viajes registrados por trabajadores.

## Características

### 1. Autenticación
- Login con usuario/contraseña (supervisor)
- Persistencia de sesión en localStorage
- Logout seguro

### 2. Gestión de Viajes
- Vista de todos los viajes registrados
- **Filtros:** por trabajador, por vehículo, por fecha, por estado
- **Multiselección:** validar/rechazar múltiples viajes simultáneamente
- Acciones individuales: validar o rechazar viajes
- Estados: Pendiente, Validado, Rechazado

### 3. Gestión de Trabajadores
- Lista de trabajadores activos
- Ver vehículos asignados
- Resetear contraseña (genera contraseña temporal)

### 4. Reportes y Estadísticas
- Total de km por trabajador
- Total de km por vehículo
- Total de km por mes
- Total de km por año
- Viajes validados vs rechazados
- Gráficos básicos

## Instalación

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Estructura del Proyecto

```
src/
  ├── pages/
  │   ├── LoginPage.tsx        # Página de login
  │   └── DashboardPage.tsx    # Dashboard principal
  ├── components/
  │   ├── TripsView.tsx        # Gestión de viajes
  │   ├── WorkersView.tsx      # Gestión de trabajadores
  │   └── ReportsView.tsx      # Reportes y estadísticas
  ├── context/
  │   └── AuthContext.tsx      # Contexto de autenticación
  ├── App.tsx                  # App principal
  ├── Router.tsx               # Router
  └── index.css                # Estilos globales
```

## Próximas Mejoras (v1.1.0+)

- [ ] Integración real con tRPC backend
- [ ] Gráficos avanzados (Chart.js)
- [ ] Exportación de reportes (PDF/Excel)
- [ ] Notificaciones en tiempo real (WebSocket)
- [ ] Temas oscuro/claro
- [ ] Búsqueda avanzada
- [ ] Paginación en tablas
