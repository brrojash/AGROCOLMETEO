'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Brain, TrendingUp, AlertTriangle, Droplets, Thermometer, Bug, Zap, CheckCircle, Star, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface AgriculturalApplication {
  id: number
  name: string
  slug: string
  description: string
  short_description: string
  application_type: string
  price: number
  estimated_savings: string
  roi_percentage: number
  payback_period: string
  variables_required: string[]
  algorithm_type: string
  precision_percentage: number
  alert_types: string[]
  target_crops: string[]
  geographic_scope: string
  setup_complexity: string
  training_required: boolean
  featured: boolean
  available: boolean
}

const applicationIcons = {
  'Prevención de Heladas': Thermometer,
  'Riego Inteligente': Droplets,
  'Detección de Plagas': Bug,
  'Optimización de Nutrientes': Zap,
  'Predicción de Rendimiento': TrendingUp,
  'Monitoreo de Salud': CheckCircle
}

const applicationColors = {
  'Prevención de Heladas': 'text-blue-600 bg-blue-100',
  'Riego Inteligente': 'text-green-600 bg-green-100',
  'Detección de Plagas': 'text-red-600 bg-red-100',
  'Optimización de Nutrientes': 'text-yellow-600 bg-yellow-100',
  'Predicción de Rendimiento': 'text-purple-600 bg-purple-100',
  'Monitoreo de Salud': 'text-emerald-600 bg-emerald-100'
}

export default function AplicacionesPage() {
  const [applications, setApplications] = useState<AgriculturalApplication[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('Todas')

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await           fetch(`http://localhost:1337/api/agricultural-applications?populate=*`)
        const data = await response.json()
        setApplications(data.data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching applications:', error)
        setLoading(false)
      }
    }

    fetchApplications()
  }, [])

  const categories = ['Todas', 'Prevención', 'Optimización', 'Monitoreo', 'Predicción']
  
  const filteredApplications = selectedCategory === 'Todas' 
    ? applications 
    : applications.filter(app => app.application_type?.includes(selectedCategory))

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Brain className="h-16 w-16 text-green-600 animate-pulse mx-auto mb-4" />
          <p className="text-xl text-gray-600">Cargando aplicaciones...</p>
        </div>
      </div>
    )
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
              <Brain className="h-8 w-8 text-green-600" />
              <span className="text-2xl font-bold text-gray-900">Aplicaciones IA</span>
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
            Aplicaciones de <span className="text-green-600">Inteligencia Artificial</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Soluciones específicas con IA para optimizar cada aspecto de tu cultivo. 
            Desde prevención de heladas hasta optimización de rendimiento.
          </p>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-green-600">94.5%</div>
              <div className="text-gray-600">Precisión IA</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">300%</div>
              <div className="text-gray-600">ROI Promedio</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">6</div>
              <div className="text-gray-600">Aplicaciones Disponibles</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">2-6</div>
              <div className="text-gray-600">Meses Payback</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-green-50'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </section>

      {/* Applications Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredApplications.map((app, index) => {
            const IconComponent = applicationIcons[app.application_type as keyof typeof applicationIcons] || Brain
            const colorClasses = applicationColors[app.application_type as keyof typeof applicationColors] || 'text-gray-600 bg-gray-100'
            
            return (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 relative overflow-hidden"
              >
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                  <IconComponent className="w-full h-full" />
                </div>

                <div className="relative">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg ${colorClasses.split(' ')[1]}`}>
                      <IconComponent className={`h-8 w-8 ${colorClasses.split(' ')[0]}`} />
                    </div>
                    {app.featured && (
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium flex items-center">
                        <Star className="h-3 w-3 mr-1" />
                        Popular
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{app.name}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{app.short_description}</p>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{app.roi_percentage}%</div>
                      <div className="text-xs text-gray-500">ROI</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{app.precision_percentage}%</div>
                      <div className="text-xs text-gray-500">Precisión</div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Payback: {app.payback_period}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Algoritmo: {app.algorithm_type}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Setup: {app.setup_complexity}
                    </div>
                  </div>

                  {/* Price & CTA */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-gray-900">
                        ${app.price?.toLocaleString()}
                      </span>
                      <span className="text-gray-500"> COP</span>
                    </div>
                    <Link 
                      href={`/aplicaciones/${app.slug}`}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center"
                    >
                      Ver más
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {filteredApplications.length === 0 && (
          <div className="text-center py-12">
            <Brain className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-xl text-gray-600">No se encontraron aplicaciones en esta categoría</p>
          </div>
        )}
      </section>

      {/* Benefits Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">¿Por qué elegir nuestras aplicaciones IA?</h2>
            <p className="text-xl text-gray-600">Tecnología probada con resultados comprobados</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">ROI Comprobado</h3>
              <p className="text-gray-600">Retorno de inversión verificado en cultivos colombianos reales</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">IA Adaptativa</h3>
              <p className="text-gray-600">Algoritmos que aprenden de tu cultivo específico</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Implementación Rápida</h3>
              <p className="text-gray-600">Setup en menos de 24 horas con soporte incluido</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">¿Listo para potenciar tu cultivo con IA?</h2>
          <p className="text-xl mb-8 opacity-90">
            Consulta gratuita para determinar qué aplicación se adapta mejor a tu cultivo
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contacto" className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center">
              Consulta Gratuita
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-700 transition-colors">
              Ver Demo en Vivo
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

// Archivo: C:\Users\Tomoe\AGROCOLMETEO\frontend\src\app\aplicaciones\page.tsx