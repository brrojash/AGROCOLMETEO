# 🌱 AGROCOLMETEO

**Agricultura Inteligente para el Futuro**

Sistema completo de estaciones meteorológicas con IA y sistemas hidropónicos automatizados para optimizar cultivos, reducir costos y aumentar rendimientos.

## 🚀 Características

- **Estaciones Meteorológicas con IA**: Monitoreo climático avanzado con predicciones
- **Sistemas Hidropónicos**: Cultivo sin suelo con automatización completa
- **Dashboard Web**: Interface moderna y responsive
- **API REST**: Backend completo con Strapi CMS
- **Conectividad IoT**: 4G, WiFi, LoRaWAN

## 🛠️ Tecnologías

### Frontend
- **Next.js 14** - React Framework
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos utilitarios
- **Framer Motion** - Animaciones fluidas
- **Lucide Icons** - Iconografía moderna

### Backend
- **Strapi CMS** - Headless CMS
- **Node.js** - Runtime JavaScript
- **SQLite** - Base de datos
- **REST API** - Endpoints para frontend

## 📦 Instalación

### Prerrequisitos
- Node.js 18+ 
- npm o yarn
- Git

### Clonar repositorio
```bash
git clone https://github.com/brrojash/AGROCOLMETEO.git
cd AGROCOLMETEO
```

### Backend (Strapi)
```bash
cd backend
npm install
npm run develop
```
El backend estará disponible en: `http://localhost:1337`

### Frontend (Next.js)
```bash
cd frontend
npm install
npm run dev
```
El frontend estará disponible en: `http://localhost:3000`

## 🌐 Deploy con Ngrok

Para hacer la aplicación accesible públicamente:

```bash
# Terminal 1: Backend
cd backend && npm run develop

# Terminal 2: Frontend  
cd frontend && npm run dev

# Terminal 3: Túnel público frontend
ngrok http 3000

# Terminal 4: Túnel público backend
ngrok http 1337
```

Actualizar la URL del backend en `frontend/src/config/api.ts` con la URL de ngrok.

## 📊 Productos

### Estaciones Meteorológicas
- **AgroClima Pro Station**: IA integrada, 12 sensores, conectividad múltiple
- **AgroSensor Basic**: Monitoreo esencial para pequeños productores

### Sistemas Hidropónicos  
- **HidroTech NFT Pro**: Sistema NFT automatizado con IA
- **HidroBasic DWC**: Sistema DWC ideal para principiantes

## 🎯 Beneficios

- **500+ Agricultores Conectados**
- **15,000 Hectáreas Monitoreadas** 
- **99.8% Precisión de Datos**
- **40% Aumento en Rendimiento**

## 📞 Contacto

- **Email**: info@agrocolmeteo.com
- **Ubicación**: Bogotá, Colombia
- **GitHub**: [@brrojash](https://github.com/brrojash)

## 🏆 Impacto

- 95% menos uso de agua
- 30% más rápida producción vs suelo tradicional  
- Sin pesticidas ni herbicidas
- Cosechas durante todo el año

---

**© 2025 AGROCOLMETEO - Revolucionando la agricultura con tecnología inteligente**