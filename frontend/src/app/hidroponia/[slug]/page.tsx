'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Droplets, Cpu, Wifi, CheckCircle, Star, Thermometer, Package, Clock, Zap, Leaf, Container, Settings } from 'lucide-react'
import Link from 'next/link'
import { useParams, notFound } from 'next/navigation'

interface HydroponicSystem {
  id: number
  name: string
  slug: string
  description: string
  short_description: string
  price: number
  system_type: string
  capacity: number
  target_crop: string
  ai_embedded: boolean
  autonomous_operation: boolean
  installation_included: boolean
  warranty_months: number
  featured: boolean
  available: boolean
  stock: number
  water_tank_capacity: number
  power_consumption: number
  featured_image: {
    url: string
    formats: {
      large: { url: string }
      medium: { url: string }
      small: { url: string }
      thumbnail: { url: string }
    }
  }
}

export default function HidroponiaPage() {
  const params = useParams()
  const [system, setSystem] = useState<HydroponicSystem | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchSystem = async () => {
      try {
        const response = await fetch(`http://localhost:1337/api/hydroponic-systems?filters[slug][$eq]=${params.slug}&populate=*`)
        
        if (!response.ok) {
          throw new Error('System not found')
        }
        
        const data = await response.json()
        
        if (data.data.length === 0) {
          setError(true)
          return
        }
        
        setSystem(data.data[0])
        setLoading(false)
      } catch (error) {
        console.error('Error fetching system:', error)
        setError(true)
        setLoading(false)
      }
    }

    if (params.slug) {
      fetchSystem()
    }
  }, [params.slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <Droplets className="h-16 w-16 text-blue-600 animate-pulse mx-auto mb-4" />
          <p className="text-xl text-gray-600">Cargando sistema hidropónico...</p>
        </div>
      </div>
    )
  }

  if (error || !system) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-50 border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center text-blue-600 hover:text-blue-700 transition-colors">
              <ArrowLeft className="h-6 w-6 mr-2" />
              Volver al inicio
            </Link>
            <div className="flex items-center space-x-2">
              <Droplets className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">AGROCOLMETEO</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Product Header */}
          <div className="grid lg:grid-cols-2 gap-12 mb-12">
            <div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl shadow-xl p-2 h-96 overflow-hidden"
              >
                {system.featured_image?.url ? (
                  <img 
                    src={`http://localhost:1337${system.featured_image.url}`}
                    alt={system.name}
                    className="w-full h-full object-cover rounded-xl"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Droplets className="h-32 w-32 text-blue-600" />
                  </div>
                )}
              </motion.div>
            </div>
            
            <div className="space-y-6">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {system.system_type}
                  </span>
                  {system.featured && (
                    <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                      <Star className="h-4 w-4 mr-1" />
                      Destacado
                    </span>
                  )}
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">{system.name}</h1>
                <p className="text-xl text-gray-600">{system.short_description}</p>
              </div>
              
              <div className="flex items-center space-x-4">
                <span className="text-4xl font-bold text-blue-600">
                  ${system.price?.toLocaleString()} COP
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <Package className="h-5 w-5 mr-2 text-blue-600" />
                  Capacidad: {system.capacity} plantas
                </div>
                <div className="flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-yellow-600" />
                  Consumo: {system.power_consumption}W
                </div>
                <div className="flex items-center">
                  <Container className="h-5 w-5 mr-2 text-green-600" />
                  Tanque: {system.water_tank_capacity}L
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-purple-600" />
                  Stock: {system.stock} unidades
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Comprar Ahora
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                >
                  Solicitar Cotización
                </motion.button>
              </div>

              {system.installation_included && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center text-blue-800">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    <span className="font-medium">Instalación incluida</span>
                  </div>
                  <p className="text-sm text-blue-700 mt-1">
                    Garantía de {system.warranty_months} meses
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {system.ai_embedded && (
              <div className="bg-white rounded-lg p-6 shadow-md text-center">
                <Cpu className="h-12 w-12 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">IA Integrada</h3>
                <p className="text-sm text-gray-600">Control automático inteligente</p>
              </div>
            )}
            
            {system.autonomous_operation && (
              <div className="bg-white rounded-lg p-6 shadow-md text-center">
                <Settings className="h-12 w-12 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Operación Autónoma</h3>
                <p className="text-sm text-gray-600">Funcionamiento 24/7 automático</p>
              </div>
            )}
            
            <div className="bg-white rounded-lg p-6 shadow-md text-center">
              <Leaf className="h-12 w-12 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Cultivo Optimizado</h3>
              <p className="text-sm text-gray-600">Para {system.target_crop}</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md text-center">
              <Container className="h-12 w-12 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Sistema {system.system_type}</h3>
              <p className="text-sm text-gray-600">Tecnología avanzada</p>
            </div>
          </div>

          {/* Detailed Information */}
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Especificaciones Técnicas</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Características del Sistema</h3>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-blue-500 mr-2" />
                      Tipo: {system.system_type}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-blue-500 mr-2" />
                      Capacidad: {system.capacity} plantas
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-blue-500 mr-2" />
                      Cultivo objetivo: {system.target_crop}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Especificaciones de Agua y Energía</h3>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <Container className="h-4 w-4 text-blue-500 mr-2" />
                      Tanque de agua: {system.water_tank_capacity}L
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Zap className="h-4 w-4 text-yellow-500 mr-2" />
                      Consumo eléctrico: {system.power_consumption}W
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Funciones Incluidas</h3>
                  <div className="space-y-2">
                    {system.ai_embedded && (
                      <div className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-blue-500 mr-2" />
                        Inteligencia artificial integrada
                      </div>
                    )}
                    {system.autonomous_operation && (
                      <div className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-blue-500 mr-2" />
                        Operación completamente autónoma
                      </div>
                    )}
                    <div className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-blue-500 mr-2" />
                      Control de pH y nutrientes
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-blue-500 mr-2" />
                      Monitoreo de temperatura
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Descripción Completa</h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-600 leading-relaxed">{system.description}</p>
              </div>
              
              <div className="mt-8">
                <h3 className="font-semibold text-gray-900 mb-4">Ventajas del Sistema {system.system_type}</h3>
                <div className="space-y-2">
                  {system.system_type === 'NFT' && (
                    <>
                      <div className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-blue-500 mr-2" />
                        Flujo continuo de nutrientes
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-blue-500 mr-2" />
                        Excelente oxigenación de raíces
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-blue-500 mr-2" />
                        Bajo consumo de agua
                      </div>
                    </>
                  )}
                  {system.system_type === 'DWC' && (
                    <>
                      <div className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-blue-500 mr-2" />
                        Raíces directamente en nutrientes
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-blue-500 mr-2" />
                        Crecimiento muy rápido
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-blue-500 mr-2" />
                        Ideal para principiantes
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Beneficios Clave</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Producción 30% más rápida que suelo</li>
                  <li>• 95% menos uso de agua</li>
                  <li>• Sin pesticidas ni herbicidas</li>
                  <li>• Cosechas durante todo el año</li>
                </ul>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-blue-600 text-white rounded-2xl p-8 mt-12 text-center">
            <h2 className="text-3xl font-bold mb-4">¿Listo para comenzar tu cultivo hidropónico?</h2>
            <p className="text-xl mb-6 opacity-90">
              {system.installation_included ? 'Instalación profesional incluida' : 'Asesoría de instalación disponible'} - Garantía de {system.warranty_months} meses
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contacto" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Contactar Especialista
              </Link>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Ver Demostración
              </button>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}

// Archivo: C:\Users\Tomoe\AGROCOLMETEO\frontend\src\app\hidroponia\[slug]\page.tsx