# 🌱 AGROCOLMETEO - Plataforma AgTech Inteligente

## 📋 Descripción del Proyecto

**AGROCOLMETEO** es una plataforma web full-stack desarrollada para la comercialización de estaciones meteorológicas y sistemas hidropónicos con inteligencia artificial integrada, diseñada específicamente para agricultura de precisión en Colombia.

## 🛠️ Stack Tecnológico

### Backend
- **Strapi CMS** - Headless CMS para gestión de contenido
- **PostgreSQL** - Base de datos relacional robusta
- **Node.js** - Runtime del servidor
- **API REST** - Endpoints completos para frontend

### Frontend
- **Next.js 15** - Framework React con App Router
- **React 19** - Biblioteca de interfaz de usuario
- **TypeScript** - Tipado estático para código robusto
- **Tailwind CSS v4** - Framework CSS moderno
- **Framer Motion** - Animaciones fluidas
- **Lucide React** - Iconografía profesional

### Herramientas de Desarrollo
- **Axios + SWR** - Manejo de APIs y cache
- **ESLint** - Linting de código
- **PostCSS** - Procesamiento CSS

## 🏗️ Arquitectura del Proyecto

```
agrocolmeteo/
├── backend/          # Strapi CMS + PostgreSQL
│   ├── src/
│   │   ├── api/      # Collection Types y Controllers
│   │   └── components/ # Componentes reutilizables
│   └── config/       # Configuración base de datos
└── frontend/         # Next.js Application
    ├── src/
    │   ├── app/      # App Router (Next.js 15)
    │   ├── components/ # Componentes React
    │   └── lib/      # Utilidades y configuración
    └── public/       # Assets estáticos
```

## 📊 Características Principales

### 🔧 Backend (Strapi + PostgreSQL)
- **4 Collection Types** personalizados (117 campos total)
- **4 Components** reutilizables para estructura modular
- **Relaciones many-to-many** entre entidades
- **Panel administrativo** completo para gestión de contenido
- **API REST** con endpoints optimizados
- **Upload de imágenes** con múltiples formatos

### 🎨 Frontend (Next.js + React)
- **Landing page moderna** con hero section y animaciones
- **Catálogo de productos** con filtros dinámicos
- **Páginas individuales** para cada producto
- **Responsive design** completo (mobile-first)
- **SEO optimizado** con meta tags dinámicos
- **Conexión real** con APIs backend

### 💼 Funcionalidades Comerciales
- **Gestión de inventario** (stock y disponibilidad)
- **Catálogo digital** con precios en COP
- **Especificaciones técnicas** detalladas
- **CTAs estratégicos** para conversión
- **Testimonios** de clientes verificados

## 🗄️ Estructura de Datos

### Entidades Principales:
- **Estaciones Meteorológicas** (27 campos)
- **Sistemas Hidropónicos** (29 campos)  
- **Aplicaciones IA** (24 campos)
- **Portafolio Agricultores** (16 campos)

### Componentes Reutilizables:
- **Growing Conditions** - Condiciones de cultivo
- **Dimensions** - Especificaciones físicas
- **SEO** - Optimización motores búsqueda
- **AI Features** - Características inteligencia artificial

## 📈 Métricas del Proyecto

- **📱 4 páginas** principales completamente funcionales
- **🛍️ 7 productos** reales con contenido comercial
- **💰 $5.85M COP** en catálogo de productos
- **⚡ 100%** conexión backend-frontend establecida
- **📊 117 campos** estructurados en base de datos
- **🎯 2 categorías** de productos especializados

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js 18+
- PostgreSQL 12+
- npm o yarn

### Backend (Strapi)
```bash
cd backend
npm install
npm run develop
# Servidor: http://localhost:1337
```

### Frontend (Next.js)
```bash
cd frontend
npm install
npm run dev
# Aplicación: http://localhost:3000
```

### Variables de Entorno
```bash
# Backend (.env)
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=agrocolmeteo_db
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=tu_password

# Frontend (.env.local)
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
```

## 🎯 Características Técnicas Destacadas

### Performance
- **SSR/SSG** con Next.js para SEO optimizado
- **Lazy loading** de componentes e imágenes
- **Cache inteligente** con SWR
- **Optimización** automática de imágenes

### UX/UI
- **Diseño moderno** con gradientes y micro-animaciones
- **Navigation fluida** entre páginas
- **Loading states** y error handling
- **Accessibility** con semántica HTML correcta

### Escalabilidad
- **Arquitectura modular** para fácil mantenimiento
- **TypeScript** para desarrollo a escala
- **API REST** preparada para mobile apps
- **Base de datos** normalizada y optimizada

## 🏆 Valor Técnico y Comercial

Este proyecto demuestra habilidades en:
- ✅ **Full-Stack Development** con tecnologías modernas
- ✅ **Database Design** y modelado de datos complejos
- ✅ **API Development** con Strapi headless CMS
- ✅ **Frontend React** con Next.js y TypeScript
- ✅ **UI/UX Design** responsivo y moderno
- ✅ **Business Logic** para e-commerce funcional

## 📞 Contacto

**Desarrollado por:** Bryan Tomoe  
**Email:** [tu-email@ejemplo.com]  
**LinkedIn:** [tu-perfil-linkedin]  
**Portfolio:** [https://brrojash.github.io/mi-portafolio/]

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

⭐ **Si te gusta este proyecto, dale una estrella en GitHub!**