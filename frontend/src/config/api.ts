// config/api.ts
export const API_CONFIG = {
  // URLs locales con dominio personalizado
  HTTPS_LOCAL_URL: 'https://agrocolmeteo.local',
  HTTP_LOCAL_URL: 'http://agrocolmeteo.local',
  
  // URLs de desarrollo directo
  LOCALHOST_URL: 'http://localhost:1337',
  
  // URL de ngrok (si se usa)
  NGROK_URL: 'https://def456.ngrok.io',
  
  // Detectar automáticamente la configuración
  BASE_URL: typeof window !== 'undefined' 
    ? (window.location.hostname === 'agrocolmeteo.local')
      ? window.location.protocol === 'https:' 
        ? 'https://agrocolmeteo.local'   // HTTPS con dominio personalizado
        : 'http://agrocolmeteo.local'    // HTTP con dominio personalizado  
      : (window.location.hostname === 'localhost')
        ? window.location.protocol === 'https:'
          ? 'https://localhost'          // HTTPS localhost
          : 'http://localhost:1337'      // HTTP desarrollo directo
        : 'https://def456.ngrok.io'      // Ngrok u otro
    : 'http://localhost:1337'            // Fallback para SSR
}

export const getApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`
}

export const getImageUrl = (imagePath: string): string => {
  if (!imagePath) return ''
  if (imagePath.startsWith('http')) return imagePath
  return `${API_CONFIG.BASE_URL}${imagePath}`
}

// Función para obtener la URL base actual
export const getCurrentDomain = (): string => {
  if (typeof window !== 'undefined') {
    return `${window.location.protocol}//${window.location.hostname}`
  }
  return 'http://localhost:1337'
}

// Log para debugging (opcional)
if (typeof window !== 'undefined') {
  console.log('🌐 AGROCOLMETEO API Config:', {
    hostname: window.location.hostname,
    protocol: window.location.protocol,
    baseUrl: API_CONFIG.BASE_URL
  })
}