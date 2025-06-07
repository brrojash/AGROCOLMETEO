'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Cloud, Cpu, Wifi, CheckCircle, Star, Thermometer, Package, Clock, Zap } from 'lucide-react'
import Link from 'next/link'
import { useParams, notFound } from 'next/navigation'

interface Station {
  id: number
  name: string
  slug: string
  description: string
  short_description: string
  price: number
  model: string
  manufacturer: string
  ai_embedded: boolean
  autonomous_operation: boolean
  remote_monitoring: boolean
  precision_agriculture: boolean
  wireless_sensors: string[]
  ai_features_included: {
    predictive_analytics: boolean
    automated_alerts: boolean
    data_visualization: boolean
    machine_learning_models: boolean
    integration_apis: boolean
  }
  connectivity: string[]
  power_consumption: number
  operating_temperature_range: string
  data_storage_capacity: string
  warranty_months: number
  featured: boolean
  available: boolean
  stock: number
  installation_included: boolean
  featured_image: {
    url: string
    formats: {
      large: { url: string }
      medium: { url: string }
      small: { url: string }
      thumbnail: { url: string }
    }
  }
  dimensions: {
    length: number
    width: number
    height: number
    weight: number
    unit: string
  }
}

export default function EstacionPage() {
  const params = useParams()
  const [station, setStation] = useState<Station | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchStation = async () => {
      try {
        const response = await fetch(`http://localhost:1337/api/stations?filters[slug][$eq]=${params.slug}&populate=*`)
        
        if (!response.ok) {
          throw new Error('Station not found')
        }
        
        const data = await response.json()
        
        if (data.data.length === 0) {
          setError(true)
          return
        }
        
        setStation(data.data[0])
        setLoading(false)
      } catch (error) {
        console.error('Error fetching station:', error)
        setError(true)
        setLoading(false)
      }
    }

    if (params.slug) {
      fetchStation()
    }
  }, [params.slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Cloud className="h-16 w-16 text-blue-600 animate-pulse mx-auto mb-4" />
          <p className="text-xl text-gray-600">Cargando estación meteorológica...</p>
        </div>
      </div>
    )
  }

  if (error || !station) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-50 border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center text-green-600 hover:text-green-700 transition-colors">
              <ArrowLeft className="h-6 w-6 mr-2" />
              Volver al inicio
            </Link>
            <div className="flex items-center space-x-2">
              <Cloud className="h-8 w-8 text-blue-600" />
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
                {station.featured_image?.url ? (
                  <img 
                    src={`http://localhost:1337${station.featured_image.url}`}
                    alt={station.name}
                    className="w-full h-full object-cover rounded-xl"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Cloud className="h-32 w-32 text-blue-600" />
                  </div>
                )}
              </motion.div>
            </div>
            
            <div className="space-y-6">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {station.model}
                  </span>
                  {station.featured && (
                    <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                      <Star className="h-4 w-4 mr-1" />
                      Destacado
                    </span>
                  )}
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">{station.name}</h1>
                <p className="text-xl text-gray-600">{station.short_description}</p>
              </div>
              
              <div className="flex items-center space-x-4">
                <span className="text-4xl font-bold text-blue-600">
                  ${station.price?.toLocaleString()} COP
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <Package className="h-5 w-5 mr-2 text-blue-600" />
                  Fabricante: {station.manufacturer}
                </div>
                <div className="flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-yellow-600" />
                  Consumo: {station.power_consumption}W
                </div>
                <div className="flex items-center">
                  <Thermometer className="h-5 w-5 mr-2 text-red-600" />
                  Temperatura: {station.operating_temperature_range}
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-purple-600" />
                  Stock: {station.stock} unidades
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

              {station.installation_included && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center text-blue-800">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    <span className="font-medium">Instalación incluida</span>
                  </div>
                  <p className="text-sm text-blue-700 mt-1">
                    Garantía de {station.warranty_months} meses
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {station.ai_embedded && (
              <div className="bg-white rounded-lg p-6 shadow-md text-center">
                <Cpu className="h-12 w-12 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">IA Integrada</h3>
                <p className="text-sm text-gray-600">Análisis predictivo automatizado</p>
              </div>
            )}
            
            {station.remote_monitoring && (
              <div className="bg-white rounded-lg p-6 shadow-md text-center">
                <Wifi className="h-12 w-12 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Monitoreo Remoto</h3>
                <p className="text-sm text-gray-600">Control desde cualquier lugar</p>
              </div>
            )}
            
            {station.autonomous_operation && (
              <div className="bg-white rounded-lg p-6 shadow-md text-center">
                <Zap className="h-12 w-12 text-yellow-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Operación Autónoma</h3>
                <p className="text-sm text-gray-600">Funcionamiento automático 24/7</p>
              </div>
            )}
            
            {station.precision_agriculture && (
              <div className="bg-white rounded-lg p-6 shadow-md text-center">
                <Thermometer className="h-12 w-12 text-red-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Agricultura de Precisión</h3>
                <p className="text-sm text-gray-600">Datos exactos para optimización</p>
              </div>
            )}
          </div>

          {/* Detailed Information */}
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Especificaciones Técnicas</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Sensores Inalámbricos</h3>
                  <div className="space-y-2">
                    {station.wireless_sensors?.map((sensor, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-blue-500 mr-2" />
                        {sensor}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Conectividad</h3>
                  <div className="flex flex-wrap gap-2">
                    {station.connectivity?.map((conn, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {conn}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Dimensiones</h3>
                  <p className="text-gray-600">
                    {station.dimensions?.length} x {station.dimensions?.width} x {station.dimensions?.height} {station.dimensions?.unit}
                    <br />
                    Peso: {station.dimensions?.weight} kg
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Almacenamiento</h3>
                  <p className="text-gray-600">{station.data_storage_capacity}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Descripción Completa</h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-600 leading-relaxed">{station.description}</p>
              </div>
              
              {station.ai_features_included && (
                <div className="mt-8">
                  <h3 className="font-semibold text-gray-900 mb-4">Funciones de IA Incluidas</h3>
                  <div className="space-y-2">
                    {station.ai_features_included.predictive_analytics && (
                      <div className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-blue-500 mr-2" />
                        Análisis Predictivo del Clima
                      </div>
                    )}
                    {station.ai_features_included.automated_alerts && (
                      <div className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-blue-500 mr-2" />
                        Alertas Automáticas de Riesgo
                      </div>
                    )}
                    {station.ai_features_included.data_visualization && (
                      <div className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-blue-500 mr-2" />
                        Dashboard de Visualización
                      </div>
                    )}
                    {station.ai_features_included.machine_learning_models && (
                      <div className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-blue-500 mr-2" />
                        Modelos de Machine Learning
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Beneficios Clave</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Monitoreo en tiempo real 24/7</li>
                  <li>• Predicciones climáticas precisas</li>
                  <li>• Optimización de recursos agrícolas</li>
                  <li>• Alertas tempranas de riesgos</li>
                </ul>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-blue-600 text-white rounded-2xl p-8 mt-12 text-center">
            <h2 className="text-3xl font-bold mb-4">¿Listo para optimizar tu producción?</h2>
            <p className="text-xl mb-6 opacity-90">
              {station.installation_included ? 'Instalación profesional incluida' : 'Asesoría técnica disponible'} - Garantía de {station.warranty_months} meses
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

// Archivo: C:\Users\Tomoe\AGROCOLMETEO\frontend\src\app\estaciones\[slug]\page.tsx