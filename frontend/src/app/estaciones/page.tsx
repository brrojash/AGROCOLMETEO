'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Cloud, Wifi, Cpu, Thermometer, CheckCircle, Star, ArrowRight } from 'lucide-react'
import Link from 'next/link'

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
  featured: boolean
  available: boolean
  stock: number
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

export default function EstacionesPage() {
  const [stations, setStations] = useState<Station[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await fetch('http://localhost:1337/api/stations?populate=*')
        const data = await response.json()
        setStations(data.data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching stations:', error)
        setLoading(false)
      }
    }

    fetchStations()
  }, [])

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
              <Cloud className="h-8 w-8 text-green-600" />
              <span className="text-2xl font-bold text-gray-900">Estaciones Meteorológicas</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Estaciones <span className="text-green-600">Meteorológicas</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Monitoreo en tiempo real de variables climáticas con inteligencia artificial. 
            Optimiza tu producción agrícola con datos precisos y alertas predictivas.
          </p>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600">24/7</div>
              <div className="text-gray-600">Monitoreo</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">94.5%</div>
              <div className="text-gray-600">Precisión</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">300%</div>
              <div className="text-gray-600">ROI</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">12</div>
              <div className="text-gray-600">Sensores</div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            // Loading skeletons
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 animate-pulse">
                <div className="h-6 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-6"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
              </div>
            ))
          ) : (
            stations.map((station, index) => (
              <motion.div
                key={station.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 relative overflow-hidden"
              >
                {/* Background Icon */}
                <div className="absolute top-0 right-0 w-24 h-24 opacity-5">
                  <Cloud className="w-full h-full" />
                </div>

                <div className="relative">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-blue-100 flex items-center justify-center">
                      {station.featured_image?.url ? (
                        <img 
                          src={`http://localhost:1337${station.featured_image.formats?.thumbnail?.url || station.featured_image.url}`}
                          alt={station.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Cloud className="h-8 w-8 text-blue-600" />
                      )}
                    </div>
                    {station.featured && (
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium flex items-center">
                        <Star className="h-3 w-3 mr-1" />
                        Destacado
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{station.name}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{station.short_description}</p>

                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    {station.ai_embedded && (
                      <div className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        IA Integrada
                      </div>
                    )}
                    {station.remote_monitoring && (
                      <div className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        Monitoreo Remoto
                      </div>
                    )}
                    {station.autonomous_operation && (
                      <div className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        Operación Autónoma
                      </div>
                    )}
                  </div>

                  {/* Stock & Price */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-sm text-gray-500">Stock: {station.stock} unidades</span>
                    <span className="text-sm text-gray-500">Modelo: {station.model}</span>
                  </div>

                  {/* Price & CTA */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-gray-900">
                        ${station.price?.toLocaleString()}
                      </span>
                      <span className="text-gray-500"> COP</span>
                    </div>
                    <Link 
                      href={`/estaciones/${station.slug}`}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center"
                    >
                      Ver más
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {stations.length === 0 && !loading && (
          <div className="text-center py-12">
            <Cloud className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-xl text-gray-600">No se encontraron estaciones meteorológicas</p>
          </div>
        )}
      </section>

      {/* Benefits Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">¿Por qué elegir nuestras estaciones?</h2>
            <p className="text-xl text-gray-600">Tecnología avanzada para agricultura de precisión</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Cpu className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">IA Avanzada</h3>
              <p className="text-gray-600">Algoritmos de machine learning para predicciones precisas</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wifi className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Conectividad Total</h3>
              <p className="text-gray-600">4G, WiFi y LoRa para máxima cobertura</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Thermometer className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Sensores Precisos</h3>
              <p className="text-gray-600">Medición exacta de variables climáticas críticas</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">¿Listo para optimizar tu cultivo?</h2>
          <p className="text-xl mb-8 opacity-90">
            Obtén datos climáticos precisos y alertas predictivas para maximizar tu producción
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contacto" className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center">
              Solicitar Cotización
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Ver Demo
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

// Archivo: C:\Users\Tomoe\AGROCOLMETEO\frontend\src\app\estaciones\page.tsx