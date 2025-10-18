# AXISUS MES Frontend

## Overview

The AXISUS MES (Manufacturing Execution System) Frontend is a modern React application built with TypeScript that provides an intuitive interface for managing manufacturing operations. It features real-time monitoring, comprehensive dashboards, and streamlined workflows for operators, managers, and administrators.

## Technologies

- **React 18** with TypeScript
- **Vite** for fast development
- **Tailwind CSS** for styling
- **Shadcn/ui** components
- **React Router** for navigation
- **TanStack Query** for data fetching and caching
- **Axios** for HTTP requests
- **Recharts** for data visualization
- **Lucide React** for icons

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Shadcn/ui components
│   ├── charts/         # Chart components
│   ├── forms/          # Form components
│   └── layout/         # Layout components
├── pages/              # Page components
├── lib/                # Utility functions and API clients
├── hooks/              # Custom React hooks
├── context/            # React context providers
├── types/              # TypeScript interfaces and types
└── assets/             # Static assets
```

## Pages

### Dashboard
The main landing page featuring:
- Real-time machine status monitoring
- OEE (Overall Equipment Effectiveness) metrics
- Production order tracking
- Performance indicators

### Production Orders
Management interface for:
- Creating and tracking production orders
- Monitoring order progress
- Starting, pausing, and completing orders

### Machines
Machine management features:
- Machine status monitoring
- Performance metrics display
- Maintenance scheduling

### Products
Product catalog management:
- Product creation and editing
- Inventory tracking
- Specification management

### Users
User administration:
- User account management
- Role assignment
- Permission control

### Analytics
Comprehensive reporting:
- Historical performance analysis
- Quality metrics
- Downtime analysis
- Production flow optimization

## Components

### UI Components
- Buttons, cards, dialogs, and forms from Shadcn/ui
- Custom chart components using Recharts
- Data tables with sorting and filtering
- Navigation menus and breadcrumbs

### Layout Components
- Responsive sidebar navigation
- Header with user profile
- Footer with system information
- Dashboard widgets

### Form Components
- Validation forms with Zod
- Custom input components
- File upload components
- Date/time pickers

## State Management

### React Context
Global state management for:
- Authentication state
- Theme preferences
- Notification system
- Sidebar state

### TanStack Query
Data fetching and caching:
- API data synchronization
- Background data refreshing
- Error handling and retries
- Loading states

## Styling

### Tailwind CSS
Utility-first CSS framework with:
- Custom color palette
- Responsive design breakpoints
- Component variants
- Dark mode support

### CSS Modules
Scoped styling for:
- Component-specific styles
- Animation effects
- Transition effects

## Routing

The application uses React Router for navigation with:

```
/                    - Dashboard
/login              - Authentication
/dashboard           - Main dashboard
/operador            - Operator view
/ordens-producao    - Production orders
/produtos            - Product management
/gestao-usuarios     - User management
/gestao-grupo        - Group management
/dashboard-tatico    - Tactical dashboard
/analise-qualidade   - Quality analysis
/analise-disponibilidade - Availability analysis
/analise-performance - Performance analysis
/registrar-producao  - Production logging
/analise-paradas     - Stop analysis
/analise-fluxo       - Flow analysis
/parametros          - System parameters
```

## API Integration

### Axios Configuration
- Base URL configuration
- Request/response interceptors
- Authentication token handling
- Error handling middleware

### API Client
Custom API client with:
- Typed request/response methods
- Authentication token management
- Request cancellation support
- Retry mechanisms

### Hooks
Custom React hooks for:
- Data fetching with TanStack Query
- Form handling
- Authentication state
- Real-time updates

## Authentication

### Login Flow
- Credential validation
- JWT token storage
- User session management
- Redirect handling

### Protected Routes
- Role-based access control
- Route guards
- Permission checking

## Forms

### Form Validation
- Zod schema validation
- Real-time validation feedback
- Error message display
- Submission handling

### Custom Form Components
- Input fields with validation
- Select dropdowns
- Date/time pickers
- File upload components

## Charts and Visualizations

### Recharts Integration
- Line charts for trend analysis
- Bar charts for comparison
- Pie charts for distribution
- Area charts for cumulative data

### Custom Chart Components
- OEE dashboard widgets
- Real-time data visualization
- Interactive tooltips
- Responsive sizing

## Responsive Design

### Mobile-First Approach
- Flexible grid layouts
- Media query breakpoints
- Touch-friendly controls
- Adaptive components

### Breakpoints
- Mobile (sm): 640px
- Tablet (md): 768px
- Desktop (lg): 1024px
- Large Desktop (xl): 1280px
- Extra Large (2xl): 1536px

## Performance Optimization

### Code Splitting
- Route-based code splitting
- Dynamic imports
- Lazy loading components

### Bundle Optimization
- Tree shaking
- Minification
- Image optimization

### Caching Strategies
- HTTP caching headers
- Browser caching
- Service worker caching

## Testing

### Unit Testing
- Jest for unit tests
- React Testing Library
- Component testing
- Hook testing

### Integration Testing
- API integration tests
- End-to-end testing
- Cypress for E2E tests

## Internationalization

### i18n Support
- Multi-language support
- Translation files
- Language switching
- RTL support

## Accessibility

### WCAG Compliance
- Semantic HTML
- ARIA attributes
- Keyboard navigation
- Screen reader support

## Deployment

### Build Process
- Vite build optimization
- Environment variable injection
- Asset fingerprinting
- Source map generation

### Hosting
- Static file hosting
- CDN deployment
- CI/CD pipeline integration

## Development

### Local Development
```bash
npm install
npm run dev
```

### Building for Production
```bash
npm run build
```

### Previewing Build
```bash
npm run preview
```

## Environment Variables

The frontend uses the following environment variables:

```env
VITE_API_URL=http://localhost:4000/api
VITE_APP_NAME=AXISUS MES
VITE_APP_VERSION=1.0.0
```

## Browser Support

- Latest Chrome, Firefox, Safari, Edge
- Mobile browsers (iOS Safari, Chrome for Android)
- Progressive Web App support

## Progressive Web App

### Features
- Offline support
- Installable application
- Push notifications
- Background sync

### Manifest
Web app manifest for home screen installation and splash screens.

## Security

### Content Security Policy
- Script-src restrictions
- Style-src restrictions
- Connect-src restrictions
- Font-src restrictions

### Cross-Origin Resource Sharing
- CORS headers configuration
- Allowed origins
- Credential handling

## Monitoring and Analytics

### Performance Monitoring
- Web Vitals tracking
- Error reporting
- User interaction analytics

### Logging
- Console logging
- Remote logging service
- Error boundary implementation